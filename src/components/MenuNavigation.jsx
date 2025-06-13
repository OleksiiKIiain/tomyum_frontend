import React, { useState, useEffect, useRef } from "react";
import { fetchCategories } from "../services/api";

const MenuNavigation = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [categories, setCategories] = useState([]);
  const menuRef = useRef(null);

  const OFFSET = 150;

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sliderHeight = document.getElementById("slider")?.offsetHeight || 300;
      setIsFixed(window.scrollY >= sliderHeight);

      const sections = document.querySelectorAll("section");
      let currentSection = "";
      let inAnySection = false;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - OFFSET - 150;
        const sectionBottom = section.offsetTop + section.offsetHeight - 150;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.getAttribute("id");
          inAnySection = true;
        }
      });

      setActiveSection(inAnySection ? currentSection : "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuRef.current && activeSection) {
      const activeItem = menuRef.current.querySelector(
        `a[href="#${activeSection}"]`
      );
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [activeSection]);

  const handleMenuClick = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop - OFFSET;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  return (
    <div className={`w-full bg-white shadow-md transition-all ${isFixed ? "fixed top-0 left-0 z-10" : "absolute top-auto"}`}>
      <ul
        ref={menuRef}
        className="flex container justify-between overflow-x-auto whitespace-nowrap scrollbar-hidden p-4 text-xl font-semibold lg:text-xl"
      >
        {categories.map((category) => (
          <li
            key={category.name}
            className={`mr-6 ${activeSection === category.name ? "text-black border-b-4 border-primary pb-2" : "text-gray-500"}`}
          >
            <a
              href={`#${category.name}`}
              onClick={(e) => handleMenuClick(e, category.name)}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuNavigation;

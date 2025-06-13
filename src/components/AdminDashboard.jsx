import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  fetchAllDishes,
  createDish,
  updateDish,
  deleteDish,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api';

export default function AdminDashboard() {
  const [tab, setTab] = useState('dishes');
  const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/deahe628t/image/upload/v1747221036/Image-not-found_kmigoz.png';

  const navigate = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDishes = dishes.filter(d =>
  d.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const [categories, setCategories] = useState([]);

  const [createForm, setCreateForm] = useState({ name: '', description: '', price: '', category_id: '', imageFile: null });
  const createFileRef = useRef(null);

  const [editForm, setEditForm] = useState(null);
  const editFileRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [d, c] = await Promise.all([fetchAllDishes(), fetchCategories()]);
    setDishes(d);
    setCategories(c);
  }

  const handleCreateChange = e => {
    const { name, value, files, type } = e.target;
    if (type === 'file') setCreateForm(f => ({ ...f, imageFile: files[0] }));
    else setCreateForm(f => ({ ...f, [name]: value }));
  };

  const handleEditChange = e => {
    const { name, value, files, type } = e.target;
    setEditForm(f => ({
      ...f,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleCreateSubmit = async () => {
    const fd = new FormData();
  
    const { name, description, price, category_id, imageFile } = createForm;
  
    fd.append('name', name);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('category_id', category_id);
  
    if (imageFile) {
      fd.append('image', imageFile);
    } else {
      // Завантажити дефолтну картинку як Blob
      const response = await fetch(DEFAULT_IMAGE_URL);
      const blob = await response.blob();
      const defaultFile = new File([blob], "default.png", { type: blob.type });
      fd.append('image', defaultFile);
    }
  
    await createDish(fd);
    setCreateForm({ name: '', description: '', price: '', category_id: '', imageFile: null });
    if (createFileRef.current) createFileRef.current.value = null;
    loadData();
  };

  const startEdit = dish => {
    setEditForm({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category_id: dish.category_id,
      imageFile: null,
    });
    if (editFileRef.current) editFileRef.current.value = null;
  };

  const handleEditSubmit = async () => {
    if (!editForm) return;
    const { id, name, description, price, category_id, imageFile } = editForm;
    if (!name || !price || !category_id) return;

    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('description', description);
      fd.append('price', parseFloat(price));
      fd.append('category_id', category_id);
      if (imageFile) {
        fd.append('image', imageFile);
      }
      await updateDish(id, fd);
      setEditForm(null);
      loadData();
    } catch (error) {
      console.error('Помилка при оновленні страви:', error);
    }
  };

  const cancelEdit = () => setEditForm(null);

  const handleDelete = async id => {
    if (confirm('Видалити страву?')) {
      await deleteDish(id);
      loadData();
    }
  };

  const [catForm, setCatForm] = useState({ name: '' });
  const handleCatChange = e => setCatForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleCatCreate = async () => {
    await createCategory(catForm);
    setCatForm({ name: '' });
    loadData();
  };
  const handleCatUpdate = async (id, newName) => {
    await updateCategory(id, { name: newName });
    loadData();
  };
  const handleCatDelete = async id => {
    if (confirm('Видалити категорію?')) {
      await deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-4 py-2 rounded mb-4"
      >
        ← Назад на головну
      </button>
      <h1 className="text-3xl font-bold mb-6">Адмін-панель</h1>
      <div className="flex space-x-4 mb-6">
        <button className={`px-4 py-2 ${tab==='dishes'?'bg-primary text-white':'bg-gray-200'}`} onClick={()=>setTab('dishes')}>Страви</button>
        <button className={`px-4 py-2 ${tab==='categories'?'bg-primary text-white':'bg-gray-200'}`} onClick={()=>setTab('categories')}>Категорії</button>
      </div>

      {tab==='dishes' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Управління стравами</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              {editForm ? (
                <>
                  <h3 className="font-bold mb-2">Редагувати страву</h3>
                  <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Назва" className="w-full mb-2 p-2 border" />
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Опис" className="w-full mb-2 p-2 border" />
                  <input name="price" value={editForm.price} onChange={handleEditChange} placeholder="Ціна" className="w-full mb-2 p-2 border" />
                  <select name="category_id" value={editForm.category_id} onChange={handleEditChange} className="w-full mb-2 p-2 border">
                    <option value="">-- Категорія --</option>
                    {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input type="file" name="imageFile" ref={editFileRef} accept="image/*" onChange={handleEditChange} className="w-full mb-2 p-2 border" />
                  <div className="flex gap-2">
                    <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Зберегти</button>
                    <button onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">Скасувати</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold mb-2">Додати нову страву</h3>
                  <input name="name" value={createForm.name} onChange={handleCreateChange} placeholder="Назва" className="w-full mb-2 p-2 border" />
                  <textarea name="description" value={createForm.description} onChange={handleCreateChange} placeholder="Опис" className="w-full mb-2 p-2 border" />
                  <input name="price" value={createForm.price} onChange={handleCreateChange} placeholder="Ціна" className="w-full mb-2 p-2 border" />
                  <select name="category_id" value={createForm.category_id} onChange={handleCreateChange} className="w-full mb-2 p-2 border">
                    <option value="">-- Категорія --</option>
                    {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <input type="file" name="imageFile" ref={createFileRef} accept="image/*" onChange={handleCreateChange} className="w-full mb-2 p-2 border" />
                  <button onClick={handleCreateSubmit} className="bg-primary text-white px-4 py-2 rounded">Створити</button>
                </>
              )}
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-bold mb-2">Список страв</h3>

              {/* Поле для пошуку */}
              <input
                type="text"
                placeholder="Пошук страви..."
                className="w-full mb-3 p-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Список з прокруткою */}
              <div className="max-h-[400px] overflow-y-auto pr-1">
                {filteredDishes.map((d) => (
                  <div key={d.id} className="p-2 border-b flex justify-between items-center">
                    <span>{d.name}</span>
                    <div className="space-x-2">
                      <button onClick={() => startEdit(d)} className="text-blue-600">Edit</button>
                      <button onClick={() => handleDelete(d.id)} className="text-red-600">Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='categories' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Управління категоріями</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-bold mb-2">Створити категорію</h3>
              <input name="name" value={catForm.name} onChange={handleCatChange} placeholder="Назва категорії" className="w-full mb-2 p-2 border" />
              <button onClick={handleCatCreate} className="bg-primary text-white px-4 py-2 rounded">Створити</button>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-bold mb-2">Список категорій</h3>
              {categories.map(c=> (
                <div key={c.id} className="p-2 border-b flex justify-between items-center">
                  <span>{c.name}</span>
                  <div className="space-x-2">
                    <button onClick={()=> {
                      const newName = prompt('Нова назва', c.name);
                      if(newName) handleCatUpdate(c.id, newName);
                    }} className="text-blue-600">Edit</button>
                    <button onClick={()=>handleCatDelete(c.id)} className="text-red-600">Del</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

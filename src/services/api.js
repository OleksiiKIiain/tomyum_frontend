const BASE = import.meta.env.VITE_API_BASE || '/api';
let token = localStorage.getItem('jwt') || null;

export function setToken(t) {
  token = t;
  localStorage.setItem('jwt', t);
}

export function clearToken() {
  token = null;
  localStorage.removeItem('jwt');
}

function headers(json = true) {
  const h = {};
  if (json) h['Content-Type'] = 'application/json';
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

export async function login({ email, password }) {
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    throw new Error('Введіть дійсну електронну адресу');
  }

  if (!password || password.length < 6) {
    throw new Error('Пароль має містити щонайменше 6 символів');
  }

  const form = new URLSearchParams();
  form.append('username', email);
  form.append('password', password);

  const res = await fetch(`${BASE}/auth/jwt/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    if (typeof data.detail === 'string') {
      switch (data.detail) {
        case 'LOGIN_BAD_CREDENTIALS':
          throw new Error('Невірна електронна адреса або пароль');
        default:
          throw new Error(`Помилка: ${data.detail}`);
      }
    }
    throw new Error('Не вдалося увійти');
  }

  const { access_token } = data;
  setToken(access_token);
  return access_token;
}


export async function logout() {
  await fetch(`${BASE}/auth/jwt/logout`, {
    method: 'POST',
    headers: headers(false),
  });
  clearToken();
}


export async function register({ email, password }) {
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    throw new Error('Введіть дійсну електронну адресу (латиницею, з @ та доменом)');
  }

  if (!password || password.length < 6) {
    throw new Error('Пароль має містити щонайменше 6 символів');
  }

  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (Array.isArray(data.detail)) {
      const msg = data.detail.map(d => {
        if (d.loc?.includes('email')) return 'Невірна електронна адреса';
        if (d.loc?.includes('password')) return 'Пароль не відповідає вимогам';
        return d.msg;
      }).join('. ');
      throw new Error(msg);
    }

    if (typeof data.detail === 'string') {
      if (data.detail === 'REGISTER_USER_ALREADY_EXISTS') {
        throw new Error('Користувач з такою адресою вже існує');
      }
      throw new Error(`Помилка: ${data.detail}`);
    }

    throw new Error('Не вдалося зареєструватися');
  }

  return data;
}


export async function fetchMe() {
  const res = await fetch(`${BASE}/users/me`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Користувача не знайдено');
  return res.json();
}

export async function fetchAllDishes() {
  const res = await fetch(`${BASE}/dishes/`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Не вдалося завантажити страви');
  return res.json();

  
}


export async function searchDishes(q) {
  const res = await fetch(
    `${BASE}/dishes/search?q=${encodeURIComponent(q)}`,
    { headers: headers(false) }
  );
  if (!res.ok) throw new Error('Не вдалося знайти страви');
  return res.json();
}

export async function fetchDishesByCategory(catId) {
  const res = await fetch(`${BASE}/dishes/by-category/${catId}`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Не вдалося відфільтрувати страви');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories/`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Не вдалося завантажити категорії');
  return res.json();
}

export async function createDish(data) {
    // data — це або звичайний об’єкт (JSON), або FormData (з файлом)
    const isForm = data instanceof FormData;
    const res = await fetch(`${BASE}/dishes/`, {
      method: 'POST',
      headers: headers(!isForm),        // якщо FormData — пропускаємо Content-Type
      body: isForm ? data : JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Не вдалося створити страву');
    return res.json();
  }

  export async function updateDish(id, changes) {
    const isForm = changes instanceof FormData;
    const res = await fetch(`${BASE}/dishes/${id}`, {
      method: 'PUT',
      headers: headers(!isForm),
      body: isForm ? changes : JSON.stringify(changes),
    });
  
    if (!res.ok) {
      const errorText = await res.text();  // <- отримаємо текст помилки з бекенда
      console.error('Помилка при оновленні страви:', errorText);
      throw new Error('Не вдалося оновити страву');
    }
  
    return res.json();
  }

export async function deleteDish(id) {
  const res = await fetch(`${BASE}/dishes/${id}`, {
    method: 'DELETE',
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Не вдалося видалити страву');
}


export async function createCategory(category) {
  const res = await fetch(`${BASE}/categories/`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Не вдалося створити категорію');
  return res.json();
}

export async function updateCategory(id, category) {
  const res = await fetch(`${BASE}/categories/${id}`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Не вдалося оновити категорію');
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${BASE}/categories/${id}`, {
    method: 'DELETE',
    headers: headers(false),
  });
  if (!res.ok) throw new Error('Не вдалося видалити категорію');
}

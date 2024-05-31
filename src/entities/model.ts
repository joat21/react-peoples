export type Meta = {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
};

export type People = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;

  // Если авторизованный пользователь отправляет patch запрос
  // то Mokky.dev автоматически добавляет в измененный объект поле user
  // в котором хранятся данные о пользователе, который совершил изменение
  user?: any;
};

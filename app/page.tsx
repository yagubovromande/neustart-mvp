"use client";

import { useState } from "react";

type Screen =
  | "home"
  | "profile"
  | "people"
  | "weekly"
  | "contacts"
  | "events"
  | "partners"
  | "admin";

const demoPeople = [
  {
    id: 1,
    name: "Анна Краузе",
    age: 34,
    city: "Düsseldorf",
    profession: "Учитель немецкого",
    language: "B2",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    about: "Переехала в Германию как поздняя переселенка. Помогаю новичкам адаптироваться, найти языковые курсы и не бояться первых документов.",
    interests: ["Немецкий язык", "Семья", "Документы"],
    lookingFor: ["Общение", "Помощь с документами", "Друзей"],
    reason: "Совпадает город и интерес к немецкому языку",
  },
  {
    id: 2,
    name: "Михаил Вебер",
    age: 41,
    city: "Köln",
    profession: "Предприниматель",
    language: "B1",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    about: "Развиваю небольшой сервисный бизнес. Ищу людей для обмена опытом, совместных проектов и локального нетворкинга.",
    interests: ["Бизнес", "Работа", "IT"],
    lookingFor: ["Бизнес-партнёров", "Клиентов", "Общение"],
    reason: "Ищет бизнес-партнёров",
  },
  {
    id: 3,
    name: "Елена Шмидт",
    age: 29,
    city: "Dortmund",
    profession: "HR-специалист",
    language: "C1",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    about: "Помогаю разобраться с резюме, собеседованиями и первыми шагами на немецком рынке труда.",
    interests: ["Работа", "Немецкий язык", "Карьера"],
    lookingFor: ["Работу", "Наставника", "Общение"],
    reason: "Может помочь с поиском работы",
  },
  {
    id: 4,
    name: "Андрей Гофман",
    age: 38,
    city: "Neuss",
    profession: "Автомеханик",
    language: "A2",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    about: "Живу рядом с Düsseldorf. Интересуюсь автомобилями, спортом и локальными встречами по выходным.",
    interests: ["Авто", "Спорт", "Друзья"],
    lookingFor: ["Друзей", "Совместный отдых", "Общение"],
    reason: "Рядом с вашим городом",
  },
  {
    id: 5,
    name: "Наталья Беккер",
    age: 36,
    city: "Düsseldorf",
    profession: "Мама, бухгалтер",
    language: "B1",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&h=300&fit=crop",
    about: "Ищу семьи с детьми для общения, прогулок и обмена опытом жизни в Германии.",
    interests: ["Семья", "Дети", "Культура"],
    lookingFor: ["Друзей", "Совместный отдых", "Общение"],
    reason: "Семья с детьми и общий город",
  },
];

const events = [
  {
    title: "Языковой клуб B1",
    city: "Düsseldorf",
    date: "Среда, 18:00",
    org: "Riwvel",
    description: "Живое общение на немецком для поздних переселенцев.",
  },
  {
    title: "Встреча поздних переселенцев NRW",
    city: "Köln",
    date: "Суббота, 14:00",
    org: "Riwvel",
    description: "Знакомства, обмен опытом, ответы на бытовые вопросы.",
  },
  {
    title: "Вебинар: как искать работу в Германии",
    city: "Online",
    date: "Четверг, 19:30",
    org: "NeuStart",
    description: "Резюме, Jobcenter, собеседования и первые шаги.",
  },
];

const partners = [
  {
    title: "Медицинское страхование",
    category: "Страхование",
    description: "Помощь с выбором Krankenkasse и базовыми вопросами.",
  },
  {
    title: "Курсы немецкого",
    category: "Обучение",
    description: "Подбор языковых курсов и интеграционных программ.",
  },
  {
    title: "Банк и счёт",
    category: "Финансы",
    description: "Помощь с открытием счёта и базовой финансовой адаптацией.",
  },
  {
    title: "Юридическая консультация",
    category: "Документы",
    description: "Навигация по типовым вопросам переезда и интеграции.",
  },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [contacts, setContacts] = useState<number[]>([]);
  const [selectedPerson, setSelectedPerson] = useState(demoPeople[0]);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  function addContact(id: number) {
    setContacts((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-2xl">
        <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                Telegram Mini App
              </p>
              <h1 className="text-2xl font-black tracking-tight">NeuStart</h1>
            </div>
            <button
              onClick={() => setScreen("admin")}
              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
            >
              Demo Admin
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-5 pb-28 pt-5">
          {screen === "home" && (
            <div className="space-y-5">
              <div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl">
                <p className="mb-2 text-sm font-semibold opacity-90">
                  Сообщество поздних переселенцев Германии
                </p>
                <h2 className="text-3xl font-black leading-tight">
                  Найдите своих людей в новом городе
                </h2>
                <p className="mt-4 text-sm leading-6 text-blue-50">
                  NeuStart помогает русским немцам знакомиться, находить поддержку,
                  события, партнёров и полезные сервисы после переезда.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setScreen("profile")}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-blue-700"
                  >
                    Создать анкету
                  </button>
                  <button
                    onClick={() => setScreen("people")}
                    className="rounded-2xl bg-blue-900/30 px-4 py-3 text-sm font-bold text-white ring-1 ring-white/30"
                  >
                    Найти людей
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat value="3 000" label="аудитория Riwvel" />
                <Stat value="612" label="активных профилей" />
                <Stat value="84" label="новых за неделю" />
              </div>

              <BlockTitle
                title="Подборка недели"
                text="Каждую неделю NeuStart предлагает новых людей по тегам “ищу”, интересам и городу."
              />
              <div className="space-y-3">
                {demoPeople.slice(0, 3).map((p) => (
                  <PersonMini
                    key={p.id}
                    person={p}
                    onClick={() => {
                      setSelectedPerson(p);
                      setScreen("people");
                    }}
                  />
                ))}
              </div>

              <BlockTitle
  title="Почему это важно"
  text="Поздние переселенцы часто начинают жизнь в Германии без локального круга общения. NeuStart помогает быстрее найти людей, события, поддержку и полезные сервисы."
              />
            </div>
          )}

          {screen === "profile" && (
            <div className="space-y-5">
              <BlockTitle
                title="Анкета участника"
                text="Фото обязательно: так сообществу проще доверять друг другу."
              />

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <label className="mb-2 block text-sm font-bold">Фото профиля</label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-200">
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoPreview} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl">
                        📷
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-sm"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPhotoPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>
              </div>

              <FormInput label="Имя" placeholder="Например: Роман" />
              <FormInput label="Возраст" placeholder="43" />
              <FormInput label="Город в Германии" placeholder="Düsseldorf" />
              <FormInput label="Страна / регион происхождения" placeholder="Россия, Казахстан..." />
              <FormInput label="Год переезда" placeholder="2024" />
              <FormInput label="Профессия" placeholder="Предприниматель" />
              <textarea
                className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-blue-500"
                placeholder="Расскажите о себе минимум 2 предложения..."
              />

              <TagSection
                title="Интересы"
                tags={[
                  "Немецкий язык",
                  "Работа",
                  "Бизнес",
                  "Семья",
                  "Дети",
                  "Спорт",
                  "IT",
                  "Авто",
                  "Документы",
                  "Жильё",
                  "Друзья",
                  "Культура",
                ]}
              />

              <TagSection
                title="Кого ищу"
                tags={[
                  "Друзей",
                  "Бизнес-партнёров",
                  "Наставника",
                  "Работу",
                  "Клиентов",
                  "Общение",
                  "Совместный отдых",
                  "Помощь с документами",
                ]}
              />

              <button
                onClick={() => setScreen("people")}
                className="w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-lg"
              >
                Сохранить и перейти к людям
              </button>
            </div>
          )}

          {screen === "people" && (
            <div className="space-y-4">
              <BlockTitle
                title="Люди рядом"
                text="Добавляйте интересных людей в контакты. В реальном продукте чат откроется после взаимного интереса."
              />
              {demoPeople.map((p) => (
                <PersonCard
                  key={p.id}
                  person={p}
                  onOpen={() => setSelectedPerson(p)}
                  onAdd={() => addContact(p.id)}
                />
              ))}

              <div className="rounded-3xl bg-slate-900 p-5 text-white">
                <h3 className="text-xl font-black">{selectedPerson.name}</h3>
                <p className="mt-1 text-sm text-slate-300">
                  {selectedPerson.city}, {selectedPerson.age} · Немецкий {selectedPerson.language}
                </p>
                <p className="mt-4 text-sm leading-6">{selectedPerson.about}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedPerson.lookingFor.map((t) => (
                    <span key={t} className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addContact(selectedPerson.id)}
                  className="mt-5 w-full rounded-2xl bg-white py-3 font-bold text-slate-900"
                >
                  + Добавить в контакты
                </button>
              </div>
            </div>
          )}

          {screen === "weekly" && (
            <div className="space-y-4">
              <BlockTitle
                title="Ваша подборка недели"
                text="NeuStart подобрал 5 человек по тегам, интересам и городу."
              />
              {demoPeople.map((p) => (
                <div key={p.id} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                  <PersonMini person={p} onClick={() => setSelectedPerson(p)} />
                  <p className="mt-3 rounded-2xl bg-blue-50 p-3 text-sm font-semibold text-blue-700">
                    Причина: {p.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          {screen === "contacts" && (
            <div className="space-y-4">
              <BlockTitle title="Мои контакты" text="Люди, которых вы добавили в визитницу." />
              {contacts.length === 0 ? (
                <EmptyState
                  title="Контактов пока нет"
                  text="Перейдите в раздел Люди и добавьте первых участников."
                  button="Найти людей"
                  onClick={() => setScreen("people")}
                />
              ) : (
                demoPeople
                  .filter((p) => contacts.includes(p.id))
                  .map((p) => <PersonMini key={p.id} person={p} onClick={() => setSelectedPerson(p)} />)
              )}
            </div>
          )}

          {screen === "events" && (
            <div className="space-y-4">
              <BlockTitle
                title="События"
                text="Встречи, вебинары и локальные мероприятия для поздних переселенцев."
              />
              {events.map((e) => (
                <div key={e.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <p className="text-sm font-bold text-blue-600">{e.date} · {e.city}</p>
                  <h3 className="mt-2 text-xl font-black">{e.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{e.description}</p>
                  <p className="mt-3 text-xs font-bold text-slate-400">Организатор: {e.org}</p>
                  <button className="mt-4 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white">
                    Участвовать
                  </button>
                </div>
              ))}
            </div>
          )}

          {screen === "partners" && (
            <div className="space-y-4">
              <BlockTitle
                title="Партнёры"
                text="Будущая монетизация: партнёрские сервисы помогают участникам, а фонды получают 40% от вознаграждения."
              />
              {partners.map((p) => (
                <div key={p.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    партнёр NeuStart
                  </span>
                  <h3 className="mt-3 text-xl font-black">{p.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600">{p.category}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.description}</p>
                  <button
                    onClick={() =>
                      alert("Заявка отправлена. В реальном продукте партнёр получит лид, а фонд — реферальное вознаграждение.")
                    }
                    className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                  >
                    Получить консультацию
                  </button>
                </div>
              ))}
            </div>
          )}

          {screen === "admin" && (
            <div className="space-y-4">
              <BlockTitle
                title="Demo Admin"
                text="Визуальная демонстрация будущей панели собственника и фондов."
              />
              <div className="grid grid-cols-2 gap-3">
                <Stat value="3 000" label="участников Riwvel" />
                <Stat value="612" label="активных профилей" />
                <Stat value="84" label="новых за неделю" />
                <Stat value="27" label="партнёрских лидов" />
                <Stat value="€1 080" label="потенц. вознаграждение" />
                <Stat value="40%" label="доля фонда" />
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-xl font-black">Еженедельная подборка</h3>
                <p className="mt-2 text-sm text-slate-600">Статус: готова к запуску</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <h3 className="text-xl font-black">Сообщества</h3>
                <p className="mt-3 text-sm">Riwvel · NRW Sprachclub · Familiengruppe Düsseldorf</p>
              </div>
            </div>
          )}
        </section>

        <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-md -translate-x-1/2 grid-cols-6 border-t border-slate-200 bg-white px-2 py-2">
          <NavButton label="Главная" icon="🏠" active={screen === "home"} onClick={() => setScreen("home")} />
          <NavButton label="Анкета" icon="👤" active={screen === "profile"} onClick={() => setScreen("profile")} />
          <NavButton label="Люди" icon="🤝" active={screen === "people"} onClick={() => setScreen("people")} />
          <NavButton label="Неделя" icon="✨" active={screen === "weekly"} onClick={() => setScreen("weekly")} />
          <NavButton label="Контакты" icon="💬" active={screen === "contacts"} onClick={() => setScreen("contacts")} />
          <NavButton label="Ещё" icon="☰" active={screen === "events" || screen === "partners"} onClick={() => setScreen("events")} />
        </nav>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-xl font-black text-blue-600">{value}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function BlockTitle({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

function FormInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </label>
  );
}

function TagSection({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <h3 className="mb-3 font-black">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function PersonMini({ person, onClick }: { person: (typeof demoPeople)[0]; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-3xl bg-white p-3 text-left shadow-sm ring-1 ring-slate-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={person.photo} alt={person.name} className="h-14 w-14 rounded-2xl object-cover" />
      <div>
        <h3 className="font-black">{person.name}</h3>
        <p className="text-sm text-slate-500">{person.city} · {person.profession}</p>
      </div>
    </button>
  );
}

function PersonCard({
  person,
  onOpen,
  onAdd,
}: {
  person: (typeof demoPeople)[0];
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <button onClick={onOpen} className="flex w-full gap-4 text-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={person.photo} alt={person.name} className="h-20 w-20 rounded-3xl object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-black">{person.name}</h3>
          <p className="text-sm text-slate-500">
            {person.city}, {person.age} · {person.profession}
          </p>
          <p className="mt-2 text-xs font-bold text-blue-600">Немецкий: {person.language}</p>
        </div>
      </button>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{person.about}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {person.interests.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-slate-100 py-3 text-sm font-bold text-slate-500">Пропустить</button>
        <button onClick={onAdd} className="rounded-2xl bg-blue-600 py-3 text-sm font-bold text-white">Добавить</button>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  text,
  button,
  onClick,
}: {
  title: string;
  text: string;
  button: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-[2rem] bg-slate-50 p-8 text-center">
      <div className="text-5xl">🗂️</div>
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
      <button onClick={onClick} className="mt-5 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
        {button}
      </button>
    </div>
  );
}

function NavButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={`rounded-2xl px-1 py-2 text-center text-[10px] font-bold ${active ? "bg-blue-50 text-blue-700" : "text-slate-400"}`}>
      <div className="text-lg">{icon}</div>
      {label}
    </button>
  );
}

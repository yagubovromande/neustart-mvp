export type Locale = "ru" | "de";

export type Screen =
  | "home"
  | "profile"
  | "people"
  | "weekly"
  | "contacts"
  | "events"
  | "partners"
  | "admin";

export type Person = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
  language: string;
  photo: string;
  about: string;
  interests: string[];
  lookingFor: string[];
  reason: string;
};

export type EventItem = {
  title: string;
  city: string;
  date: string;
  org: string;
  description: string;
};

export type PartnerItem = {
  title: string;
  category: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  subtitle: string;
};

export const translations = {
  ru: {
    brand: "NeuStart",
    appLabel: "Telegram Mini App",
    admin: "Демо-админ",
    languageSwitcherLabel: "Язык интерфейса",
    localeButtons: {
      ru: "RU",
      de: "DE",
    },
    homeTag: "Сообщество поздних переселенцев Германии",
    homeTitle: "Найдите своих людей в новом городе",
    homeText:
      "NeuStart помогает русскоязычным переселенцам знакомиться, находить поддержку, события, партнёров и полезные сервисы после переезда.",
    createProfile: "Создать анкету",
    findPeople: "Найти людей",
    stats: [
      { value: "3 000", label: "аудитория Riwvel" },
      { value: "612", label: "активных профилей" },
      { value: "84", label: "новых за неделю" },
    ],
    weeklyTitle: "Подборка недели",
    weeklyText:
      "Каждую неделю NeuStart предлагает новых людей по тегам «ищу», интересам и городу.",
    weeklyConnect: "Связаться",
    whyTitle: "Почему это важно",
    whyText:
      "Поздние переселенцы часто начинают жизнь в Германии без локального круга общения. NeuStart помогает быстрее найти людей, события, поддержку и полезные сервисы.",
    eventOfWeekTitle: "Мероприятие недели",
    eventOfWeekText:
      "Живое событие, которое помогает быстрее включиться в сообщество и решить первые бытовые вопросы.",
    eventBadge: "Рекомендуем",
    usefulServicesTitle: "Полезные сервисы",
    usefulServicesText:
      "Быстрый доступ к ключевым точкам адаптации, которые чаще всего нужны в первые месяцы после переезда.",
    aiAssistantTitle: "AI Assistant",
    aiAssistantText:
      "Подскажет, какие документы собрать, куда обратиться и как двигаться по вашему сценарию адаптации шаг за шагом.",
    aiAssistantBullets: [
      "Чек-листы по переезду и документам",
      "Подбор маршрута: работа, семья, язык",
      "Быстрые ответы 24/7 внутри Mini App",
    ],
    aiAssistantButton: "Открыть помощника",
    profileTitle: "Анкета участника",
    profileText: "Фото обязательно: так сообществу проще доверять друг другу.",
    profilePhoto: "Фото профиля",
    profilePhotoPlaceholder: "📷",
    profilePhotoAlt: "Предпросмотр фото профиля",
    profileFields: {
      name: "Имя",
      age: "Возраст",
      city: "Город в Германии",
      origin: "Страна / регион происхождения",
      moveYear: "Год переезда",
      profession: "Профессия",
      about: "Расскажите о себе минимум 2 предложения...",
    },
    profilePlaceholders: {
      name: "Например: Роман",
      age: "43",
      city: "Düsseldorf",
      origin: "Россия, Казахстан...",
      moveYear: "2024",
      profession: "Предприниматель",
    },
    interestsTitle: "Интересы",
    lookingForTitle: "Кого ищу",
    saveProfile: "Сохранить и перейти к людям",
    peopleTitle: "Люди рядом",
    peopleText:
      "Добавляйте интересных людей в контакты. В реальном продукте чат откроется после взаимного интереса.",
    germanLevel: "Немецкий",
    addToContacts: "Добавить в контакты",
    skip: "Пропустить",
    add: "Добавить",
    weeklyScreenTitle: "Ваша подборка недели",
    weeklyScreenText:
      "NeuStart подобрал 5 человек по тегам, интересам и городу.",
    reasonLabel: "Причина",
    contactsTitle: "Мои контакты",
    contactsText: "Люди, которых вы добавили в визитницу.",
    contactsEmptyTitle: "Контактов пока нет",
    contactsEmptyText:
      "Перейдите в раздел «Люди» и добавьте первых участников.",
    eventsTitle: "События",
    eventsText:
      "Встречи, вебинары и локальные мероприятия для поздних переселенцев.",
    organizer: "Организатор",
    join: "Участвовать",
    partnersTitle: "Партнёры",
    partnersText:
      "Будущая монетизация: партнёрские сервисы помогают участникам, а фонды получают 40% от вознаграждения.",
    partnerBadge: "партнёр NeuStart",
    partnerButton: "Получить консультацию",
    partnerAlert:
      "Заявка отправлена. В реальном продукте партнёр получит лид, а фонд — реферальное вознаграждение.",
    adminTitle: "Демо-админ",
    adminText:
      "Визуальная демонстрация будущей панели собственника и фондов.",
    adminStats: [
      { value: "3 000", label: "участников Riwvel" },
      { value: "612", label: "активных профилей" },
      { value: "84", label: "новых за неделю" },
      { value: "27", label: "партнёрских лидов" },
      { value: "€1 080", label: "потенц. вознаграждение" },
      { value: "40%", label: "доля фонда" },
    ],
    adminWeeklyTitle: "Еженедельная подборка",
    adminWeeklyText: "Статус: готова к запуску",
    adminCommunitiesTitle: "Сообщества",
    adminCommunitiesText: "Riwvel · NRW Sprachclub · Familiengruppe Düsseldorf",
    nav: {
      home: "Главная",
      profile: "Анкета",
      people: "Люди",
      weekly: "Неделя",
      contacts: "Контакты",
      more: "Ещё",
    },
    emptyStateIcon: "🗂️",
    separators: {
      dot: "·",
      plus: "+",
    },
  },
  de: {
    brand: "NeuStart",
    appLabel: "Telegram Mini App",
    admin: "Demo-Admin",
    languageSwitcherLabel: "Sprache der Oberfläche",
    localeButtons: {
      ru: "RU",
      de: "DE",
    },
    homeTag: "Community für Spätaussiedler in Deutschland",
    homeTitle: "Finde deine Menschen in der neuen Stadt",
    homeText:
      "NeuStart hilft russischsprachigen Spätaussiedlern dabei, Kontakte, Unterstützung, Events, Partner und nützliche Services nach dem Umzug zu finden.",
    createProfile: "Profil erstellen",
    findPeople: "Menschen finden",
    stats: [
      { value: "3 000", label: "Riwvel-Community" },
      { value: "612", label: "aktive Profile" },
      { value: "84", label: "neu in dieser Woche" },
    ],
    weeklyTitle: "Auswahl der Woche",
    weeklyText:
      "Jede Woche schlägt NeuStart neue Menschen anhand von Such-Tags, Interessen und Stadt vor.",
    weeklyConnect: "Kontakt aufnehmen",
    whyTitle: "Warum das wichtig ist",
    whyText:
      "Spätaussiedler beginnen ihr Leben in Deutschland oft ohne lokales Netzwerk. NeuStart hilft dabei, schneller Menschen, Events, Unterstützung und hilfreiche Services zu finden.",
    eventOfWeekTitle: "Event der Woche",
    eventOfWeekText:
      "Ein empfohlenes Format, um schnell Anschluss zu finden und erste Alltagsfragen gemeinsam zu lösen.",
    eventBadge: "Empfohlen",
    usefulServicesTitle: "Hilfreiche Services",
    usefulServicesText:
      "Schneller Zugang zu den wichtigsten Stationen der Integration, die in den ersten Monaten besonders oft gebraucht werden.",
    aiAssistantTitle: "AI Assistant",
    aiAssistantText:
      "Hilft mit den nächsten Schritten, erklärt Dokumente und baut einen klaren Integrationspfad direkt in der Mini App auf.",
    aiAssistantBullets: [
      "Checklisten für Umzug und Dokumente",
      "Persönliche Route: Arbeit, Familie, Sprache",
      "Schnelle Antworten 24/7 in der Mini App",
    ],
    aiAssistantButton: "Assistent öffnen",
    profileTitle: "Teilnehmerprofil",
    profileText:
      "Ein Foto ist wichtig: So kann die Community schneller Vertrauen aufbauen.",
    profilePhoto: "Profilfoto",
    profilePhotoPlaceholder: "📷",
    profilePhotoAlt: "Vorschau des Profilfotos",
    profileFields: {
      name: "Name",
      age: "Alter",
      city: "Stadt in Deutschland",
      origin: "Herkunftsland / Region",
      moveYear: "Jahr des Umzugs",
      profession: "Beruf",
      about: "Erzähle in mindestens zwei Sätzen etwas über dich...",
    },
    profilePlaceholders: {
      name: "Zum Beispiel: Roman",
      age: "43",
      city: "Düsseldorf",
      origin: "Russland, Kasachstan...",
      moveYear: "2024",
      profession: "Unternehmer",
    },
    interestsTitle: "Interessen",
    lookingForTitle: "Ich suche",
    saveProfile: "Speichern und zu Menschen wechseln",
    peopleTitle: "Menschen in deiner Nähe",
    peopleText:
      "Füge interessante Menschen zu deinen Kontakten hinzu. Im echten Produkt öffnet sich der Chat nach gegenseitigem Interesse.",
    germanLevel: "Deutsch",
    addToContacts: "Zu Kontakten hinzufügen",
    skip: "Überspringen",
    add: "Hinzufügen",
    weeklyScreenTitle: "Deine Auswahl der Woche",
    weeklyScreenText:
      "NeuStart hat 5 Personen anhand von Tags, Interessen und Stadt ausgewählt.",
    reasonLabel: "Grund",
    contactsTitle: "Meine Kontakte",
    contactsText: "Menschen, die du zu deiner Kontaktliste hinzugefügt hast.",
    contactsEmptyTitle: "Noch keine Kontakte",
    contactsEmptyText:
      "Wechsle in den Bereich „Menschen“ und füge die ersten Teilnehmer hinzu.",
    eventsTitle: "Events",
    eventsText:
      "Treffen, Webinare und lokale Veranstaltungen für Spätaussiedler.",
    organizer: "Veranstalter",
    join: "Teilnehmen",
    partnersTitle: "Partner",
    partnersText:
      "Geplante Monetarisierung: Partner-Services helfen den Teilnehmern, während Stiftungen 40 % der Vergütung erhalten.",
    partnerBadge: "NeuStart-Partner",
    partnerButton: "Beratung anfragen",
    partnerAlert:
      "Anfrage gesendet. Im echten Produkt erhält der Partner den Lead und der Fonds die Empfehlungsvergütung.",
    adminTitle: "Demo-Admin",
    adminText:
      "Visuelle Vorschau auf das künftige Dashboard für Eigentümer und Stiftungen.",
    adminStats: [
      { value: "3 000", label: "Riwvel-Mitglieder" },
      { value: "612", label: "aktive Profile" },
      { value: "84", label: "neu in dieser Woche" },
      { value: "27", label: "Partner-Leads" },
      { value: "€1 080", label: "mögliche Vergütung" },
      { value: "40%", label: "Anteil des Fonds" },
    ],
    adminWeeklyTitle: "Wöchentliche Auswahl",
    adminWeeklyText: "Status: bereit für den Start",
    adminCommunitiesTitle: "Communities",
    adminCommunitiesText: "Riwvel · NRW Sprachclub · Familiengruppe Düsseldorf",
    nav: {
      home: "Start",
      profile: "Profil",
      people: "Menschen",
      weekly: "Woche",
      contacts: "Kontakte",
      more: "Mehr",
    },
    emptyStateIcon: "🗂️",
    separators: {
      dot: "·",
      plus: "+",
    },
  },
} as const;

export const profileTags = {
  ru: {
    interests: [
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
    ],
    lookingFor: [
      "Друзей",
      "Бизнес-партнёров",
      "Наставника",
      "Работу",
      "Клиентов",
      "Общение",
      "Совместный отдых",
      "Помощь с документами",
    ],
  },
  de: {
    interests: [
      "Deutsch",
      "Arbeit",
      "Business",
      "Familie",
      "Kinder",
      "Sport",
      "IT",
      "Auto",
      "Dokumente",
      "Wohnen",
      "Freunde",
      "Kultur",
    ],
    lookingFor: [
      "Freunde",
      "Business-Partner",
      "Mentor",
      "Arbeit",
      "Kunden",
      "Austausch",
      "Freizeit gemeinsam",
      "Hilfe mit Dokumenten",
    ],
  },
} as const;

export const peopleByLocale: Record<Locale, Person[]> = {
  ru: [
    {
      id: 1,
      name: "Анна Краузе",
      age: 34,
      city: "Düsseldorf",
      profession: "Преподаватель немецкого",
      language: "B2",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      about:
        "Переехала в Германию как поздняя переселенка. Помогаю новичкам адаптироваться, найти языковые курсы и не бояться первых документов.",
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
      about:
        "Развиваю небольшой сервисный бизнес. Ищу людей для обмена опытом, совместных проектов и локального нетворкинга.",
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
      about:
        "Помогаю разобраться с резюме, собеседованиями и первыми шагами на немецком рынке труда.",
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
      about:
        "Живу рядом с Düsseldorf. Интересуюсь автомобилями, спортом и локальными встречами по выходным.",
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
      about:
        "Ищу семьи с детьми для общения, прогулок и обмена опытом жизни в Германии.",
      interests: ["Семья", "Дети", "Культура"],
      lookingFor: ["Друзей", "Совместный отдых", "Общение"],
      reason: "Семья с детьми и общий город",
    },
  ],
  de: [
    {
      id: 1,
      name: "Anna Krause",
      age: 34,
      city: "Düsseldorf",
      profession: "Deutschlehrerin",
      language: "B2",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      about:
        "Ich bin als Spätaussiedlerin nach Deutschland gekommen. Ich helfe Neulingen bei der Integration, bei Sprachkursen und bei den ersten Dokumenten.",
      interests: ["Deutsch", "Familie", "Dokumente"],
      lookingFor: ["Austausch", "Hilfe mit Dokumenten", "Freunde"],
      reason: "Gleiche Stadt und gemeinsames Interesse an Deutsch",
    },
    {
      id: 2,
      name: "Michael Weber",
      age: 41,
      city: "Köln",
      profession: "Unternehmer",
      language: "B1",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
      about:
        "Ich baue ein kleines Servicegeschäft auf und suche Menschen für Erfahrungsaustausch, gemeinsame Projekte und lokales Networking.",
      interests: ["Business", "Arbeit", "IT"],
      lookingFor: ["Business-Partner", "Kunden", "Austausch"],
      reason: "Sucht Business-Partner",
    },
    {
      id: 3,
      name: "Elena Schmidt",
      age: 29,
      city: "Dortmund",
      profession: "HR-Spezialistin",
      language: "C1",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      about:
        "Ich helfe bei Lebenslauf, Vorstellungsgesprächen und den ersten Schritten auf dem deutschen Arbeitsmarkt.",
      interests: ["Arbeit", "Deutsch", "Karriere"],
      lookingFor: ["Arbeit", "Mentor", "Austausch"],
      reason: "Kann bei der Jobsuche helfen",
    },
    {
      id: 4,
      name: "Andrej Hofmann",
      age: 38,
      city: "Neuss",
      profession: "Kfz-Mechaniker",
      language: "A2",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      about:
        "Ich wohne in der Nähe von Düsseldorf und interessiere mich für Autos, Sport und lokale Treffen am Wochenende.",
      interests: ["Auto", "Sport", "Freunde"],
      lookingFor: ["Freunde", "Freizeit gemeinsam", "Austausch"],
      reason: "Ganz in deiner Nähe",
    },
    {
      id: 5,
      name: "Natalia Becker",
      age: 36,
      city: "Düsseldorf",
      profession: "Mutter, Buchhalterin",
      language: "B1",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&h=300&fit=crop",
      about:
        "Ich suche Familien mit Kindern für Gespräche, Spaziergänge und Austausch über das Leben in Deutschland.",
      interests: ["Familie", "Kinder", "Kultur"],
      lookingFor: ["Freunde", "Freizeit gemeinsam", "Austausch"],
      reason: "Familie mit Kindern in derselben Stadt",
    },
  ],
};

export const eventsByLocale: Record<Locale, EventItem[]> = {
  ru: [
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
      description: "Знакомства, обмен опытом и ответы на бытовые вопросы.",
    },
    {
      title: "Вебинар: как искать работу в Германии",
      city: "Online",
      date: "Четверг, 19:30",
      org: "NeuStart",
      description: "Резюме, Jobcenter, собеседования и первые шаги.",
    },
  ],
  de: [
    {
      title: "Sprachclub B1",
      city: "Düsseldorf",
      date: "Mittwoch, 18:00",
      org: "Riwvel",
      description: "Lebendiger Austausch auf Deutsch für Spätaussiedler.",
    },
    {
      title: "Treffen der Spätaussiedler in NRW",
      city: "Köln",
      date: "Samstag, 14:00",
      org: "Riwvel",
      description:
        "Kennenlernen, Erfahrungsaustausch und Antworten auf Alltagsfragen.",
    },
    {
      title: "Webinar: Arbeitssuche in Deutschland",
      city: "Online",
      date: "Donnerstag, 19:30",
      org: "NeuStart",
      description: "Lebenslauf, Jobcenter, Gespräche und die ersten Schritte.",
    },
  ],
};

export const partnersByLocale: Record<Locale, PartnerItem[]> = {
  ru: [
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
      description:
        "Помощь с открытием счёта и базовой финансовой адаптацией.",
    },
    {
      title: "Юридическая консультация",
      category: "Документы",
      description:
        "Навигация по типовым вопросам переезда и интеграции.",
    },
  ],
  de: [
    {
      title: "Krankenversicherung",
      category: "Versicherung",
      description: "Hilfe bei der Wahl der Krankenkasse und bei Basisfragen.",
    },
    {
      title: "Deutschkurs",
      category: "Bildung",
      description:
        "Auswahl passender Sprachkurse und Integrationsprogramme.",
    },
    {
      title: "Bank und Konto",
      category: "Finanzen",
      description:
        "Hilfe bei Kontoeröffnung und finanzieller Orientierung.",
    },
    {
      title: "Rechtsberatung",
      category: "Dokumente",
      description:
        "Navigation durch typische Fragen rund um Umzug und Integration.",
    },
  ],
};

export const servicesByLocale: Record<Locale, ServiceItem[]> = {
  ru: [
    {
      title: "Jobcenter",
      subtitle: "Работа, выплаты и первые шаги на рынке труда",
    },
    {
      title: "Familienkasse",
      subtitle: "Пособия и поддержка для семей с детьми",
    },
    {
      title: "Integrationskurs",
      subtitle: "Язык, адаптация и навигация по государственным программам",
    },
    {
      title: "Riwvel",
      subtitle: "Сообщество, события и нетворкинг для поздних переселенцев",
    },
  ],
  de: [
    {
      title: "Jobcenter",
      subtitle: "Arbeit, Leistungen und erste Schritte auf dem Arbeitsmarkt",
    },
    {
      title: "Familienkasse",
      subtitle: "Leistungen und Unterstützung für Familien mit Kindern",
    },
    {
      title: "Integrationskurs",
      subtitle: "Sprache, Orientierung und Zugang zu staatlichen Programmen",
    },
    {
      title: "Riwvel",
      subtitle: "Community, Events und Networking für Spätaussiedler",
    },
  ],
};

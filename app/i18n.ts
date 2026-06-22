export type Locale = "ru" | "de";

export type ProductArea = "landing" | "app" | "founder" | "admin";

export type AppScreen =
  | "home"
  | "people"
  | "communities"
  | "matches"
  | "events"
  | "contacts"
  | "requests"
  | "chat"
  | "profile"
  | "services";

export type Person = {
  id: number;
  userId?: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  language: string;
  about: string;
  photoUrl?: string;
  interests: string[];
  lookingFor: string[];
  reason: string;
  status: string;
};

export type EventItem = {
  title: string;
  city: string;
  date: string;
  format: string;
  description: string;
  seatsLeft: string;
};

export type PartnerItem = {
  title: string;
  category: string;
  description: string;
  offer: string;
};

export type ServiceItem = {
  title: string;
  subtitle: string;
  detail: string;
};

export type MetricItem = {
  label: string;
  value: string;
  delta: string;
};

export type PipelineItem = {
  title: string;
  value: string;
  note: string;
};

export type StrategyCard = {
  title: string;
  text: string;
  tag: string;
};

export type OfferItem = {
  title: string;
  status: string;
  value: string;
};

export type ModerationItem = {
  title: string;
  note: string;
  priority: string;
};

export type FunnelStage = {
  title: string;
  value: string;
  percentage: number;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export const translations = {
  de: {
    brand: "NeuStart",
    appLabel: "Initiative für neue Ankommende in Deutschland",
    positioning:
      "NeuStart hilft Menschen, in Deutschland schneller Anschluss, Unterstützung und vertrauenswürdige lokale Kontakte zu finden.",
    languageSwitcherLabel: "Sprache wechseln",
    localeButtons: { de: "DE", ru: "RU" },
    topNav: {
      landing: "Startseite",
      app: "Plattform",
      founder: "Gründerbereich",
      admin: "Adminbereich",
    },
    landing: {
      badge: "Pilotansicht für Gemeinschaftsorganisationen",
      title:
        "NeuStart macht aus Ankommen wieder ein menschliches Erlebnis.",
      text:
        "Eine mehrsprachige Plattform für neue Ankommende in Deutschland: Freunde finden, hilfreiche Kontakte knüpfen, Veranstaltungen entdecken und vertrauenswürdige Services nutzen.",
      primaryCta: "Profil erstellen",
      secondaryCta: "Meine Gemeinschaft finden",
      heroNote:
        "Kostenlos für Nutzer. Gebaut für Gemeinschaft, Orientierung und einen sanfteren Neustart.",
      problemTitle: "Das Problem",
      problemText:
        "Viele Menschen fühlen sich nach dem Umzug nach Deutschland isoliert. Kontakte fehlen, lokale Informationen sind verstreut und vertrauenswürdige Hilfe ist oft schwer zu finden.",
      solutionTitle: "Die Lösung",
      solutionText:
        "NeuStart verbindet Menschen mit relevanten Personen, Gemeinschaftsgruppen und verlässlichen Services in einem klaren, warmen Produktfluss.",
      howTitle: "So funktioniert es",
      howSteps: [
        "Profil anlegen und deine Situation kurz beschreiben",
        "Wöchentliche Matches mit passenden Menschen erhalten",
        "Veranstaltungen, Gemeinschaften und verlässliche Services entdecken",
      ],
      newcomerTitle: "Für neue Ankommende",
      newcomerText:
        "NeuStart hilft beim ersten sozialen Netz, bei praktischen Fragen und beim Gefühl, nicht allein anzukommen.",
      communityTitle: "Für Gemeinschaften",
      communityText:
        "Teams aus Gemeinschaften sehen, wen sie unterstutzen konnen, wie Mitglieder aktiviert werden und welche Formate wirklich Resonanz erzeugen.",
      partnerTitle: "Für Partner",
      partnerText:
        "Partner-Services erscheinen kontextuell dort, wo sie wirklich sinnvoll sind: Sprache, Dokumente, Alltag, Finanzen und Orientierung.",
      pilotTitle: "Pilot mit Gemeinschaftsorganisationen",
      pilotText:
        "Die Ansicht ist auf Pilotgespräche mit Gemeinschaftsorganisationen, Integrationsinitiativen und lokalen Partnern ausgelegt.",
      visionTitle: "Vision des Gründers",
      visionText:
        "NeuStart soll zur Infrastruktur für mehrsprachige Ankommenswege in Deutschland werden: sozial, praktisch und langfristig skalierbar.",
      finalTitle: "Gemeinsam leichter ankommen",
      finalText:
        "Von der ersten Begegnung bis zu vertrauensvollen Services baut NeuStart eine freundlichere Infrastruktur für das Ankommen auf.",
    },
    app: {
      badge: "Plattformansicht",
      title: "So fühlt sich die NeuStart Plattform für Nutzer an",
      text:
        "Eine mobile Produktreise mit Profil, Personenvorschlägen, wöchentlichen Matches, Veranstaltungen, Kontakten und hilfreichen Services.",
      bottomNav: {
        home: "Start",
        people: "Menschen",
        profile: "Profil",
        events: "Veranstaltungen",
        contacts: "Kontakte",
      },
      profileCardTitle: "Profilvorschau",
      profileTitle: "Profil erstellen",
      profileText:
        "Ein leichter Start: genügend Informationen für gute Empfehlungen, ohne den Einstieg schwer zu machen.",
      profileFields: {
        name: "Name",
        age: "Alter",
        city: "Stadt in Deutschland",
        origin: "Sprachen oder Herkunftskontext",
        moveYear: "Jahr des Neustarts",
        profession: "Beruf oder Fokus",
        about:
          "Erzahle kurz, was du suchst und was dir beim Ankommen gerade am meisten helfen würde...",
      },
      profilePlaceholders: {
        name: "Zum Beispiel: Roman",
        age: "34",
        city: "Berlin",
        origin: "Russisch, Deutsch, Englisch",
        moveYear: "2024",
        profession: "Operations Manager",
      },
      profilePhoto: "Profilfoto",
      profilePhotoAlt: "Vorschau des Profilfotos",
      saveProfile: "Profil speichern",
      homeTitle: "Dein Neustart in einer Plattform",
      homeText:
        "Entdecke Menschen, Passungen, Veranstaltungen und hilfreiche Angebote in deiner neuen Umgebung.",
      peopleTitle: "Menschen für dich",
      peopleText:
        "Vorschläge nach Stadt, Sprache, Lebensphase und Motivation helfen dir, schneller echte Kontakte aufzubauen.",
      matchesTitle: "Wöchentliche Passungen",
      matchesText:
        "Jede Woche zeigt NeuStart neue Menschen mit nachvollziehbarer Begründung für den Match.",
      contactsTitle: "Kontakte",
      contactsText:
        "Hier sammelst du Menschen, mit denen du in Kontakt bleiben oder gemeinsam ein Event besuchen willst.",
      contactsEmptyTitle: "Noch keine Kontakte",
      contactsEmptyText:
        "Speichere die ersten interessanten Menschen aus dem Bereich Menschen.",
      eventsTitle: "Veranstaltungen in deiner Nähe",
      eventsText:
        "Kleine Formate, sichere Begegnungen und gute erste Anlässe für echte Gemeinschaftsmomente.",
      servicesTitle: "Hilfreiche Services",
      servicesText:
        "Vertrauensw?rdige Angebote für Sprache, Dokumente, Familie, Finanzen und Alltag.",
      weeklyConnect: "Profil ansehen",
      addToContacts: "Zu Kontakten",
      add: "🤝 Kennenlernen",
      reasonLabel: "Warum das passt",
      germanLevel: "Deutsch",
      interestsTitle: "Interessen",
      lookingForTitle: "Ich suche",
      aiTitle: "NeuStart Begleiter",
      aiText:
        "Begleitet den Neustart mit erklärbaren Empfehlungen statt unpersönlichen Listen.",
      aiBullets: [
        "Wöchentliche personliche Passungen",
        "Hinweise für die nächsten sinnvollen Schritte",
        "Lokale Services und Veranstaltungen im richtigen Moment",
      ],
    },
    founder: {
      badge: "Gründer-Dashboard",
      title: "Strategischer Blick auf Wachstum, Rollout der Gemeinschaft und Erlosmodell",
      text:
        "Ein interner Dashboard-Modus für Pilotgespräche, Rollout-Planung und die Monetarisierungsstory.",
      metricsTitle: "Kernmetriken",
      chartTitle: "Wachstumssignal",
      funnelTitle: "Wachstumstrichter",
      revenueTitle: "Umsatzpipeline der Partner",
      roadmapTitle: "Startfahrplan für Gemeinschaften",
      notesTitle: "Notizen des Gründers",
    },
    admin: {
      badge: "Admin-Dashboard",
      title: "Betrieb der Gemeinschaft für Mitglieder, Veranstaltungen und Moderation",
      text:
        "Ein interner Arbeitsmodus für Teams der Gemeinschaft mit Fokus auf Aktivierung, Sicherheit und Qualität.",
      healthTitle: "Zustand der Community",
      membersTitle: "Mitglieder",
      eventsTitle: "Anstehende Veranstaltungen",
      offersTitle: "Partnerangebote",
      moderationTitle: "Moderation",
      matchesTitle: "Warteschlange der Passungen",
    },
    organizer: "Gastgeber",
    join: "Platz sichern",
    memberSince: "Seit",
    profileStatus: "Status",
    footerNote:
      "Initialer Fokus: russischsprachige Menschen in Deutschland. Die offentliche Positionierung bleibt mehrsprachig und gemeinschaftsorientiert.",
  },
  ru: {
    brand: "NeuStart",
    appLabel: "Инициатива сообщества для новичков в Германии",
    positioning:
      "NeuStart помогает людям быстрее почувствовать себя своими в Германии: найти друзей, поддержку, события и надёжные полезные сервисы.",
    languageSwitcherLabel: "Переключить язык",
    localeButtons: { de: "DE", ru: "RU" },
    topNav: {
      landing: "Главная",
      app: "Приложение",
      founder: "Основатель",
      admin: "Администратор",
    },
    landing: {
      badge: "Пилотная версия для организаций сообщества",
      title:
        "NeuStart делает новый этап жизни в Германии более тёплым и человеческим.",
      text:
        "Это многоязычная платформа сообщества для новичков в Германии: найти друзей, полезные контакты, локальные события и надёжные сервисы поддержки.",
      primaryCta: "Создать профиль",
      secondaryCta: "Найти своё сообщество",
      heroNote:
        "Бесплатно для пользователей. Сделано для чувства опоры, круга общения и мягкого старта в новой среде.",
      problemTitle: "Проблема",
      problemText:
        "После переезда в Германию многие люди чувствуют изоляцию. Рядом нет своего круга, информация разбросана, а надёжную помощь и понятные контакты трудно найти.",
      solutionTitle: "Решение",
      solutionText:
        "NeuStart помогает находить подходящих людей, события, группы сообщества и проверенные сервисы в одном тёплом и понятном пользовательском пути.",
      howTitle: "Как это работает",
      howSteps: [
        "Создайте профиль и коротко расскажите о своей ситуации",
        "Получайте еженедельные подборки подходящих людей",
        "Присоединяйтесь к событиям и используйте надёжные сервисы",
      ],
      newcomerTitle: "Для новичков",
      newcomerText:
        "NeuStart помогает быстрее найти своих людей, разобраться в бытовых вопросах и не чувствовать себя в одиночестве.",
      communityTitle: "Для сообществ",
      communityText:
        "Команды сообществ видят, кому нужна поддержка, какие форматы работают лучше всего и как мягко вовлекать новых участников.",
      partnerTitle: "Для партнёров",
      partnerText:
        "Партнёрские сервисы появляются контекстно именно там, где они действительно полезны: язык, документы, семья, финансы и повседневная навигация.",
      pilotTitle: "Пилот с организациями сообщества",
      pilotText:
        "Эта пилотная версия создана для разговоров с организациями сообщества, интеграционными инициативами и локальными партнёрами.",
      visionTitle: "Видение фаундера",
      visionText:
        "NeuStart должен стать инфраструктурой для многоязычных путей адаптации в Германии: социальной, практичной и масштабируемой.",
      finalTitle: "Легче начинать новую жизнь вместе",
      finalText:
        "От первого знакомства до проверенных сервисов NeuStart строит более дружелюбную среду для адаптации и чувства принадлежности.",
    },
    app: {
      badge: "Демо приложения",
      title: "Так выглядит NeuStart для обычного пользователя",
      text:
        "Мобильный сценарий с профилем, поиском людей, еженедельными подборками, событиями, контактами и полезными сервисами.",
      bottomNav: {
        home: "Главная",
        people: "Люди",
        profile: "Профиль",
        events: "События",
        contacts: "Контакты",
      },
      profileCardTitle: "Превью профиля",
      profileTitle: "Создание профиля",
      profileText:
        "Лёгкий старт: достаточно информации для хороших рекомендаций, но без перегруженного онбординга.",
      profileFields: {
        name: "Имя",
        age: "Возраст",
        city: "Город в Германии",
        origin: "Языки или контекст переезда",
        moveYear: "Год нового старта",
        profession: "Профессия или текущий фокус",
        about:
          "Коротко расскажите, что вы ищете и что сейчас помогло бы вам почувствовать себя увереннее...",
      },
      profilePlaceholders: {
        name: "Например: Роман",
        age: "34",
        city: "Берлин",
        origin: "Русский, немецкий, английский",
        moveYear: "2024",
        profession: "Операционный менеджер",
      },
      profilePhoto: "Фото профиля",
      profilePhotoAlt: "Предпросмотр фото профиля",
      saveProfile: "Сохранить профиль",
      homeTitle: "Твой новый старт в одном приложении",
      homeText:
        "Открывай людей, еженедельные подборки, события и полезные сервисы вокруг себя.",
      peopleTitle: "Люди, которые могут быть тебе близки",
      peopleText:
        "Подборки по городу, языку, жизненному этапу и мотивации помогают быстрее выстраивать доверие.",
      matchesTitle: "Еженедельные подборки",
      matchesText:
        "Каждую неделю NeuStart предлагает новых людей и объясняет, почему вам может быть полезно познакомиться.",
      contactsTitle: "Контакты",
      contactsText:
        "Здесь собираются люди, с которыми вы хотите остаться на связи или вместе пойти на событие.",
      contactsEmptyTitle: "Пока нет контактов",
      contactsEmptyText:
        "Сохраните первых интересных людей из раздела с подборками.",
      eventsTitle: "События рядом",
      eventsText:
        "Небольшие форматы, живые встречи и безопасные поводы для первых моментов в сообществе.",
      servicesTitle: "Полезные сервисы",
      servicesText:
        "Проверенные предложения по языку, документам, семье, финансам и повседневной жизни.",
      weeklyConnect: "Открыть профиль",
      addToContacts: "В контакты",
      add: "🤝 Познакомиться",
      reasonLabel: "Почему это совпадение",
      germanLevel: "Немецкий",
      interestsTitle: "Интересы",
      lookingForTitle: "Я ищу",
      aiTitle: "Помощник NeuStart",
      aiText:
        "Сопровождает новый этап жизни через понятные рекомендации, а не обезличенные списки.",
      aiBullets: [
        "Еженедельные персональные подборки",
        "Подсказки по следующим шагам",
        "Локальные события и сервисы в нужный момент",
      ],
    },
    founder: {
      badge: "Дашборд фаундера",
      title:
        "Стратегический обзор роста, запуска сообществ и модели монетизации",
      text:
        "Это внутренний режим для пилотных разговоров, планирования rollout и обсуждения экономики продукта.",
      metricsTitle: "Ключевые метрики",
      chartTitle: "Сигналы роста",
      funnelTitle: "Воронка роста",
      revenueTitle: "Воронка партнёрской выручки",
      roadmapTitle: "План запуска сообществ",
      notesTitle: "Заметки фаундера",
    },
    admin: {
      badge: "Админ-панель",
      title:
        "Операционный режим для участников, событий, мэтчей и модерации",
      text:
        "Это внутренний рабочий режим для команды сообщества с фокусом на активности, качестве и безопасности.",
      healthTitle: "Состояние сообщества",
      membersTitle: "Участники",
      eventsTitle: "Ближайшие события",
      offersTitle: "Партнёрские предложения",
      moderationTitle: "Модерация",
      matchesTitle: "Очередь подборок",
    },
    organizer: "Организатор",
    join: "Забронировать место",
    memberSince: "С",
    profileStatus: "Статус",
    footerNote:
      "Первичный фокус: русскоязычные жители Германии. Публичное позиционирование продукта остаётся многоязычным и ориентированным на сообщество.",
  },
} as const;

export const profileTags = {
  de: {
    interests: [
      "Deutsch",
      "Karriere",
      "Familie",
      "Freunde",
      "Wohnen",
      "Kinder",
      "Netzwerken",
      "Gesundheit",
      "Dokumente",
      "Kultur",
    ],
    lookingFor: [
      "Freunde",
      "Mentor",
      "Community",
      "Veranstaltungen",
      "Kontakte",
      "Karriere-Impulse",
      "Hilfe mit Formularen",
      "Lokale Tipps",
    ],
  },
  ru: {
    interests: [
      "Немецкий язык",
      "Карьера",
      "Семья",
      "Друзья",
      "Жильё",
      "Дети",
      "Нетворкинг",
      "Здоровье",
      "Документы",
      "Культура",
    ],
    lookingFor: [
      "Друзей",
      "Наставника",
      "Сообщество",
      "События",
      "Полезные контакты",
      "Карьерные возможности",
      "Помощь с формами",
      "Локальные советы",
    ],
  },
} as const;

export const peopleByLocale: Record<Locale, Person[]> = {
  de: [
    {
      id: 1,
      name: "Anna Krause",
      age: 33,
      city: "Berlin",
      profession: "Координация сообщества",
      language: "B2",
      about:
        "Anna hilft neuen Mitgliedern in Berlin dabei, Sprachgruppen, lokale Kontakte und die ersten sicheren Community-Formate zu finden.",
      interests: ["Deutsch", "Community", "Dokumente"],
      lookingFor: ["Freunde", "Community", "Lokale Tipps"],
      reason: "Gleiche Stadt und viel Erfahrung mit Onboarding und Alltag in Deutschland.",
      status: "Profil vollstandig",
    },
    {
      id: 2,
      name: "Roman Keller",
      age: 38,
      city: "Hamburg",
      profession: "Betriebsmanager",
      language: "B1",
      about:
        "Roman baut sich in Hamburg ein neues Umfeld auf und sucht Menschen für Alltagstipps, Arbeit und gegenseitige Unterstützung.",
      interests: ["Karriere", "Familie", "Netzwerken"],
      lookingFor: ["Freunde", "Karriere-Impulse", "Mentor"],
      reason: "Ahnliche Lebensphase und starker Fokus auf beruflichen Neustart.",
      status: "Neu dabei",
    },
    {
      id: 3,
      name: "Elena Vogt",
      age: 29,
      city: "Munchen",
      profession: "UX-Forschung",
      language: "C1",
      about:
        "Elena verbindet Kultur, Sprache und Arbeitsthemen und hilft gern dabei, neue Kreise in Munchen zu erschliessen.",
      interests: ["Kultur", "Freunde", "Karriere"],
      lookingFor: ["Community", "Veranstaltungen", "Kontakte"],
      reason: "Kann bei Sprache, kultureller Orientierung und ersten sozialen Schritten helfen.",
      status: "Top-Passung",
    },
    {
      id: 4,
      name: "Maksim Adler",
      age: 35,
      city: "Koln",
      profession: "Wachstumsmarketing",
      language: "B2",
      about:
        "Maksim organisiert gern kleine Treffen und mag Formate, bei denen neue Menschen ohne Druck ins Gesprach kommen.",
      interests: ["Freunde", "Netzwerken", "Gesundheit"],
      lookingFor: ["Community", "Veranstaltungen", "Freunde"],
      reason: "Hohe Event-Aktivitat und gute Energie für neue Kontakte.",
      status: "Antwortet schnell",
    },
  ],
  ru: [
    {
      id: 1,
      name: "Анна Краузе",
      age: 33,
      city: "Берлин",
      profession: "Операции сообщества",
      language: "B2",
      about:
        "Анна помогает новым участникам в Берлине находить языковые группы, локальные контакты и безопасные форматы сообщества для первых знакомств.",
      interests: ["Немецкий язык", "Сообщество", "Документы"],
      lookingFor: ["Друзей", "Сообщество", "Локальные советы"],
      reason: "Тот же город и большой опыт с адаптацией, онбордингом и повседневной жизнью в Германии.",
      status: "Профиль заполнен",
    },
    {
      id: 2,
      name: "Роман Келлер",
      age: 38,
      city: "Гамбург",
      profession: "Операционный менеджер",
      language: "B1",
      about:
        "Роман строит в Гамбурге новый круг общения и ищет людей для разговоров про работу, быт и взаимную поддержку.",
      interests: ["Карьера", "Семья", "Нетворкинг"],
      lookingFor: ["Друзей", "Карьерные возможности", "Наставника"],
      reason: "Похожий жизненный этап и сильный фокус на карьерном перезапуске.",
      status: "Новый участник",
    },
    {
      id: 3,
      name: "Елена Фогт",
      age: 29,
      city: "Мюнхен",
      profession: "UX-исследователь",
      language: "C1",
      about:
        "Елена соединяет темы культуры, языка и работы и любит помогать людям мягко встраиваться в новые круги общения в Мюнхене.",
      interests: ["Культура", "Друзья", "Карьера"],
      lookingFor: ["Сообщество", "События", "Контакты"],
      reason: "Может помочь с языком, культурной ориентацией и первыми социальными шагами.",
      status: "Топ-матч",
    },
    {
      id: 4,
      name: "Максим Адлер",
      age: 35,
      city: "Кёльн",
      profession: "Маркетинг роста",
      language: "B2",
      about:
        "Максим любит маленькие живые встречи и форматы, где новые люди могут познакомиться без напряжения.",
      interests: ["Друзья", "Нетворкинг", "Здоровье"],
      lookingFor: ["Сообщество", "События", "Друзей"],
      reason: "Высокая активность на событиях и очень лёгкий стиль для новых знакомств.",
      status: "Быстро отвечает",
    },
  ],
};

export const eventsByLocale: Record<Locale, EventItem[]> = {
  de: [
    {
      title: "Begrussungskreis Berlin",
      city: "Berlin",
      date: "Dienstag, 19:00",
      format: "Offline",
      description:
        "Ein ruhiger Abend für neue Mitglieder mit lokalen Tipps, kleinen Intros und einem sicheren ersten Community-Moment.",
      seatsLeft: "12 Platze frei",
    },
    {
      title: "Workshop zum Karriere-Neustart",
      city: "Hamburg",
      date: "Donnerstag, 18:30",
      format: "Hybrid",
      description:
        "Ein ehrlicher Austausch uber Lebenslauf, Sprache und erste Schritte auf dem deutschen Arbeitsmarkt.",
      seatsLeft: "8 Platze frei",
    },
    {
      title: "Familientreffen Munchen",
      city: "Munchen",
      date: "Samstag, 11:00",
      format: "Offline",
      description:
        "Ein warmes Community-Format für Familien, Kinder und neue nachbarschaftliche Kontakte.",
      seatsLeft: "18 Platze frei",
    },
  ],
  ru: [
    {
      title: "Приветственный круг в Берлине",
      city: "Берлин",
      date: "Вторник, 19:00",
      format: "Оффлайн",
      description:
        "Спокойная встреча для новых участников с локальными советами, мягкими знакомствами и безопасным первым моментом в сообществе.",
      seatsLeft: "12 мест свободно",
    },
    {
      title: "Workshop по карьерному перезапуску",
      city: "Гамбург",
      date: "Четверг, 18:30",
      format: "Гибрид",
      description:
        "Честный разговор про резюме, язык и первые шаги на немецком рынке труда.",
      seatsLeft: "8 мест свободно",
    },
    {
      title: "Семейная встреча в Мюнхене",
      city: "Мюнхен",
      date: "Суббота, 11:00",
      format: "Оффлайн",
      description:
        "Тёплый формат сообщества для семей, детей и новых соседских знакомств.",
      seatsLeft: "18 мест свободно",
    },
  ],
};

export const partnersByLocale: Record<Locale, PartnerItem[]> = {
  de: [
    {
      title: "Versicherungsbegleitung",
      category: "Versicherung",
      description:
        "Hilft bei Krankenkasse, Grundschutz und den ersten Schritten nach Anmeldung und Umzug.",
      offer: "Vertrauensw?rdiger Partner-Slot",
    },
    {
      title: "Sprach-Sprint",
      category: "Sprache",
      description:
        "Ein fokussiertes Format für alltagsnahes Deutsch mit Community-Nähe und klaren Wochenzielen.",
      offer: "Community-Angebot mit Pilotlogik",
    },
    {
      title: "Finanzhilfe für den Neustart",
      category: "Finanzen",
      description:
        "Begleitet bei Konto, Alltag und den wichtigsten finanziellen Entscheidungen der ersten Monate.",
      offer: "Platzhalter für Umsatzbeteiligung im Pilot",
    },
  ],
  ru: [
    {
      title: "Помощь со страхованием",
      category: "Страхование",
      description:
        "Помогает разобраться с Krankenkasse, базовой защитой и первыми шагами после регистрации и переезда.",
      offer: "Надёжный партнёрский слот",
    },
    {
      title: "Языковой спринт",
      category: "Язык",
      description:
        "Сфокусированный формат для разговорного немецкого с поддержкой сообщества и понятными недельными целями.",
      offer: "Предложение сообщества для пилота",
    },
    {
      title: "Финансовая помощь при переезде",
      category: "Финансы",
      description:
        "Сопровождает с банком, бытовыми вопросами и ключевыми финансовыми решениями первых месяцев.",
      offer: "Демо-плейсхолдер для модели с долей выручки",
    },
  ],
};

export const servicesByLocale: Record<Locale, ServiceItem[]> = {
  de: [
    {
      title: "Путь через Jobcenter",
      subtitle: "Arbeit, Leistungen und erste Orientierung",
      detail:
        "Zeigt, wie NeuStart offentliche und partnergestutzte Wege in einem ruhigen Produktfluss verbindet.",
    },
    {
      title: "Семейный старт",
      subtitle: "Kinder, Schule und Familienalltag",
      detail:
        "Praktische Hilfe für Familien, die zwischen Behörden, Routinen und neuen sozialen Kreisen navigieren.",
    },
    {
      title: "Язык и интеграция",
      subtitle: "Kurse, Routinen und begleitete Schritte",
      detail:
        "Verbindet Sprachlernen mit lokalen Communities, wiederkehrenden Events und echten Kontakten.",
    },
    {
      title: "Надёжные центры сообщества",
      subtitle: "Lokale Gruppen und wiederkehrende Formate",
      detail:
        "Hilft dabei, die richtige Gruppe für die eigene Lebensphase und Stadt zu finden.",
    },
  ],
  ru: [
    {
      title: "Jobcenter-Weg",
      subtitle: "Работа, выплаты и первая навигация",
      detail:
        "Показывает, как NeuStart соединяет государственные и партнёрские маршруты в одном спокойном пользовательском пути.",
    },
    {
      title: "Familienstart",
      subtitle: "Дети, школа и семейный быт",
      detail:
        "Практическая помощь для семей, которым нужно разобраться с ведомствами, повседневностью и новым кругом общения.",
    },
    {
      title: "Sprache und Integration",
      subtitle: "Курсы, ритм и сопровождаемые шаги",
      detail:
        "Соединяет изучение языка с локальными сообществами, регулярными событиями и живыми знакомствами.",
    },
    {
      title: "Vertrauensw?rdige Community-Orte",
      subtitle: "Локальные группы и регулярные форматы",
      detail:
        "Помогает найти именно ту группу, которая подходит вашему этапу жизни и вашему городу.",
    },
  ],
};

export const founderMetricsByLocale: Record<Locale, MetricItem[]> = {
  de: [
    { label: "Monatlich aktive Nutzer", value: "612", delta: "+14% vs. letzter Monat" },
    { label: "Pilot-Communities", value: "18", delta: "+3 neue Gesprache" },
    { label: "Отправлено weekly matches", value: "142", delta: "68% acceptance rate" },
    { label: "Partnerumsatz", value: "EUR 3.4k", delta: "+22% Pipeline-Momentum" },
  ],
  ru: [
    { label: "Активные пользователи в месяц", value: "612", delta: "+14% к прошлому месяцу" },
    { label: "Пилотные сообщества", value: "18", delta: "+3 новых разговора" },
    { label: "Отправленные подборки за неделю", value: "142", delta: "68% принятия подборок" },
    { label: "Партнерская выручка", value: "EUR 3.4k", delta: "+22% к динамике воронки" },
  ],
};

export const communityPipelineByLocale: Record<Locale, PipelineItem[]> = {
  de: [
    {
      title: "Berliner Pilot-Community",
      value: "Aktiv",
      note: "Aktive Nutzerreise mit Events, Matches und lokaler Partner-Anbindung.",
    },
    {
      title: "Hamburger Startwelle",
      value: "Q3",
      note: "Community-Partnerschaft mit Sprach- und Karrierelogik für neue Mitglieder.",
    },
    {
      title: "NRW-Cluster",
      value: "5 Gruppen",
      note: "Mehrsprachige Gruppen mit wiederverwendbaren Match- und Admin-Workflows.",
    },
  ],
  ru: [
    {
      title: "Пилотное сообщество в Берлине",
      value: "Активно",
      note: "Активный пользовательский путь с событиями, подборками и локальными партнёрами.",
    },
    {
      title: "Волна запуска в Гамбурге",
      value: "Q3",
      note: "Партнёрство с сообществом и логикой языка и карьеры для новых участников.",
    },
    {
      title: "Кластер NRW",
      value: "5 групп",
      note: "Многоязычные группы с переиспользуемыми сценариями подборок и администрирования.",
    },
  ],
};

export const revenueCardsByLocale: Record<Locale, StrategyCard[]> = {
  de: [
    {
      title: "Ebene der Partner-Services",
      text:
        "Kontextuelle Angebote für Sprache, Versicherung und Alltag mit klarer Lead-Logik.",
      tag: "Heute",
    },
    {
      title: "Partnerschaftspakete für Communities",
      text:
        "Pilot- und Co-Branding-Setups für Organisationen, die Newcomer sozial begleiten wollen.",
      tag: "Nach MVP",
    },
    {
      title: "Premium-Werkzeugkasten für Communities",
      text:
        "Admin-Automatisierung, Einblicke und Community-CRM als langfristiger Erloshebel.",
      tag: "Fahrplan",
    },
  ],
  ru: [
    {
      title: "Слой партнёрских сервисов",
      text:
        "Контекстные предложения по языку, страховке и бытовой адаптации с понятной логикой обращений.",
      tag: "Сейчас",
    },
    {
      title: "Пакеты для партнёров-сообществ",
      text:
        "Пилотные и совместно брендированные сценарии для организаций, которые хотят социально поддерживать новичков.",
      tag: "После MVP",
    },
    {
      title: "Премиальный набор инструментов для сообществ",
      text:
        "Автоматизация администрирования, аналитика и CRM для сообществ как долгосрочный источник выручки.",
      tag: "План развития",
    },
  ],
};

export const adminMetricsByLocale: Record<Locale, MetricItem[]> = {
  de: [
    { label: "Neue Profile zur Sichtung", value: "19", delta: "7 brauchen schnelle Antwort" },
    { label: "Events diese Woche", value: "6", delta: "2 fast ausgebucht" },
    { label: "Bereite Matches in der Warteschlange", value: "42", delta: "8 brauchen manuellen Check" },
    { label: "Aktive Partnerangebote", value: "9", delta: "3 mit hoher Prioritat" },
  ],
  ru: [
    { label: "Новых профилей на просмотр", value: "19", delta: "7 нужно быстрое касание" },
    { label: "Событий на этой неделе", value: "6", delta: "2 почти заполнены" },
    { label: "Готовых подборок в очереди", value: "42", delta: "8 требуют ручной проверки" },
    { label: "Активных партнёрских предложений", value: "9", delta: "3 с высоким приоритетом" },
  ],
};

export const adminOffersByLocale: Record<Locale, OfferItem[]> = {
  de: [
    { title: "Versicherungsbegleitung", status: "Aktiv", value: "Segment mit hoher Absicht" },
    { title: "Sprach-Sprint", status: "In Prüfung", value: "Bereit für Community-Co-Branding" },
    { title: "Finanzhilfe für den Neustart", status: "In Warteschlange", value: "Test der Lead-Warteschlange" },
  ],
  ru: [
    { title: "Помощь со страхованием", status: "Активно", value: "Сегмент с высоким намерением" },
    { title: "Языковой спринт", status: "На проверке", value: "Готово к совместному запуску с сообществом" },
    { title: "Финансовая помощь при переезде", status: "В очереди", value: "Тест воронки обращений" },
  ],
};

export const moderationQueueByLocale: Record<Locale, ModerationItem[]> = {
  de: [
    {
      title: "Prüfung der Profilqualitat",
      note: "5 neue Profile brauchen klarere Beschreibung oder ein besseres erstes Foto.",
      priority: "P1",
    },
    {
      title: "Nacharbeit zur Event-Warteliste",
      note: "Der Begrussungskreis in Berlin braucht eine zweite Runde oder neue Zeitfenster.",
      priority: "P2",
    },
    {
      title: "Prüfung sensibler Vorstellungen",
      note: "3 Vorstellungen für Familiengruppen erst nach kurzer Freigabe durch das Admin-Team senden.",
      priority: "P1",
    },
  ],
  ru: [
    {
      title: "Проверка качества профилей",
      note: "5 новым профилям нужно более понятное описание или лучшее первое фото.",
      priority: "P1",
    },
    {
      title: "Работа с листом ожидания событий",
      note: "Для приветственного круга в Берлине нужна вторая сессия или дополнительные слоты.",
      priority: "P2",
    },
    {
      title: "Проверка чувствительных знакомств",
      note: "3 знакомства для семейных групп лучше отправлять только после короткого одобрения администратора.",
      priority: "P1",
    },
  ],
};

export const founderFunnelByLocale: Record<Locale, FunnelStage[]> = {
  de: [
    { title: "Reichweite", value: "12.4k", percentage: 100 },
    { title: "Begonnene Profile", value: "2.8k", percentage: 68 },
    { title: "Aktive Mitglieder", value: "612", percentage: 42 },
    { title: "Angenommene Matches", value: "97", percentage: 26 },
    { title: "Partner-Konversionen", value: "27", percentage: 14 },
  ],
  ru: [
    { title: "Охват", value: "12.4k", percentage: 100 },
    { title: "Начали профиль", value: "2.8k", percentage: 68 },
    { title: "Активные участники", value: "612", percentage: 42 },
    { title: "Принятые мэтчи", value: "97", percentage: 26 },
    { title: "Партнёрские конверсии", value: "27", percentage: 14 },
  ],
};

export const founderChartsByLocale: Record<Locale, ChartPoint[]> = {
  de: [
    { label: "Jan", value: 28 },
    { label: "Feb", value: 40 },
    { label: "Mar", value: 52 },
    { label: "Apr", value: 63 },
    { label: "May", value: 71 },
    { label: "Jun", value: 86 },
  ],
  ru: [
    { label: "Янв", value: 28 },
    { label: "Фев", value: 40 },
    { label: "Мар", value: 52 },
    { label: "Апр", value: 63 },
    { label: "Май", value: 71 },
    { label: "Июн", value: 86 },
  ],
};

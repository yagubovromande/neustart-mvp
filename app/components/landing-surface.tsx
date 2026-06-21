"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Compass,
  Globe,
  HeartHandshake,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import type {
  AppScreen,
  EventItem,
  Locale,
  PartnerItem,
  Person,
  ProductArea,
  ServiceItem,
} from "../i18n";

type LandingSurfaceProps = {
  locale: Locale;
  people: Person[];
  events: EventItem[];
  services: ServiceItem[];
  partners: PartnerItem[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onCreateProfile: () => void;
  onFindCommunity: () => void;
  onSecondaryCta?: () => void;
  onOpenAppScreen: (screen: AppScreen) => void;
  onSelectArea: (area: ProductArea) => void;
  onSetLocale: (locale: Locale) => void;
};

type ShowcaseTab = "profile" | "people" | "matches" | "events" | "partners";

type Copy = {
  nav: {
    why: string;
    how: string;
    communities: string;
    events: string;
    partners: string;
    about: string;
    cta: string;
  };
  areas: Record<ProductArea, string>;
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    body: string;
    quote: string;
    primary: string;
    secondary: string;
    proof: string;
    proofText: string;
    bot: string;
    personRole: string;
    personStory: string;
    tags: string[];
    precision: string;
    recommendation: string;
    values: string;
  };
  story: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    quote: string;
    stat: string;
    statText: string;
    cards: Array<{ title: string; body: string; badge: string }>;
  };
  matchmaker: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    language: string;
    interests: string;
    reason: string;
    copy: string;
    copied: string;
    ethicsTitle: string;
    ethicsText: string;
    summary: string;
    intensity: string;
    compatibility: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  inside: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    appTitle: string;
    appVersion: string;
    tabs: Record<ShowcaseTab, string>;
    descriptions: Record<ShowcaseTab, string>;
    memberBadge: string;
    profileTitle: string;
    interestsTitle: string;
    previewFallback: string;
    peopleBadge: string;
    weeklyTitle: string;
    matchWhy: string;
  };
  communities: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    bullets: string[];
    primary: string;
    secondary: string;
    trustLabel: string;
    trustMetric: string;
    hostRoleA: string;
    hostRoleB: string;
    hostQuoteA: string;
    hostQuoteB: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    cards: Array<{ title: string; body: string }>;
    footer: string;
  };
  founder: {
    eyebrow: string;
    quote: string;
    accent: string;
    body: string[];
    noteTitle: string;
    notes: Array<{ title: string; body: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    pills: string[];
  };
  misc: {
    branding: string;
    berlin: string;
    footer: string;
    passLabel: string;
    footerAbout: string;
    footerNavTitle: string;
    footerDocsTitle: string;
    footerNav: string[];
    footerDocs: string[];
    footerCreated: string;
  };
};

const copyByLocale: Record<Locale, Copy> = {
  de: {
    nav: {
      why: "Warum NeuStart",
      how: "So funktioniert es",
      communities: "Communities",
      events: "Veranstaltungen",
      partners: "Partner",
      about: "Uber das Projekt",
      cta: "Login / Registrierung",
    },
    areas: {
      landing: "Startseite",
      app: "Plattform",
      founder: "Grunderbereich",
      admin: "Adminbereich",
    },
    hero: {
      eyebrow: "Zugehorigkeit ist kein Luxus. Sie ist lebenswichtig.",
      titleA: "Dein neues Leben in Deutschland",
      titleB: "beginnt mit Menschen.",
      body:
        "NeuStart ist eine warme Plattform fur neue Ankommende in Deutschland. Freundschaften, kleine lokale Treffen, hilfreiche Kontakte und verlassliche Services kommen in einem ruhigen, hochwertigen Produktfluss zusammen.",
      quote: "Du bist nicht mehr allein.",
      primary: "Profil erstellen",
      secondary: "Gemeinschaft entdecken",
      proof: "4.9/5 Bewertung der Gemeinschaft",
      proofText:
        "Uber 14.200 neue Ankommende fanden in den ersten 60 Tagen echte Verbindungen.",
      bot: "Elena hat heute ein lokales Kaffeetreffen nahe Mitte empfohlen.",
      personRole: "UX-Designerin • 8 Monate in Deutschland",
      personStory:
        "Ich kam an, ohne jemanden zu kennen. Zwei Wochen spater hatte ich meinen ersten Kaffeespaziergang, vertraute Kontakte und wieder Vorfreude auf meine Wochenenden.",
      tags: ["UX-Design", "Spezialitatenkaffee", "Berlin", "Deutsch B2"],
      precision: "Matchmaker-Prazision",
      recommendation: "Personliche Empfehlung",
      values: "Gemeinsame Werte",
    },
    story: {
      eyebrow: "DIE STILLE REALITAT DER EINWANDERUNG",
      title: "Der Umzug ist mutig. Aber er sollte nicht",
      accent: "Isolation bedeuten.",
      body:
        "Wohnung, Anmeldung, Formulare: Vieles ist sichtbar. Die eigentliche Schwierigkeit beginnt oft abends, wenn niemand da ist, mit dem man die neue Stadt teilen kann.",
      quote:
        "Mit wem teile ich meine kleinen Erfolge? Wen rufe ich an, wenn der Winter dunkel wird?",
      stat: "67% der neuen Ankommenden nennen Isolation als schwersten Teil des Ankommens.",
      statText:
        "Die emotionale Last eines Neustarts ist oft schwerer als der sichtbare Burokratiestress.",
      cards: [
        {
          title: "Keine Freunde",
          body:
            "Ohne ersten sozialen Kreis werden Wochenenden lang. Die Sprachbarriere sollte dich nicht von Lachen und echten Gesprachen trennen.",
          badge: "Einsame Wochenenden",
        },
        {
          title: "Kein Netzwerk",
          body:
            "Alltag, Karriere und Orientierung wachsen in Deutschland uber Vertrauen. Ohne erste Kontakte wird alles doppelt schwer.",
          badge: "Unsichtbare Barrieren",
        },
        {
          title: "Keine verlassliche Orientierung",
          body:
            "Klassische Foren sind laut, veraltet oder voller Eigeninteressen. Neue Ankommende brauchen ruhige und ehrliche Empfehlungen.",
          badge: "Burokratischer Larm",
        },
      ],
    },
    matchmaker: {
      eyebrow: "INTERAKTIVER MATCHMAKER",
      title: "Vertrauen wird nicht automatisiert.",
      accent: "Es entsteht durch gemeinsame Themen.",
      body:
        "Passe Komfortsprache und Interessen an und sieh, wie NeuStart ein hochwertiges Wochen-Dossier fur eine neu ankommende Person zusammenstellen konnte.",
      language: "Komfortsprache",
      interests: "Zentrale Interessen",
      reason: "Warum dieser Match entsteht",
      copy: "Einstiegssatz nutzen",
      copied: "Kopiert",
      ethicsTitle: "Ethisches Matchmaking:",
      ethicsText:
        "NeuStart aktualisiert Empfehlungen nur einmal pro Woche, damit echte Treffen statt endloses Wischen entstehen.",
      summary: "Wochen-Dossier • 3 kuratierte Passungen",
      intensity: "Intensitat gemeinsamer Themen",
      compatibility: "Kompatibilitat",
    },
    steps: {
      eyebrow: "DIE NEUSTART-METHODIK",
      title: "Fur menschliches Tempo gebaut.",
      accent: "Schritt fur Schritt.",
      body:
        "NeuStart ist kein endloser Feed. Es ist ein ruhiger Weg vom Bildschirm in echte lokale Zugehorigkeit.",
      items: [
        {
          title: "Profil erstellen",
          body:
            "Ein leichtes Onboarding sammelt Sprache, Interessen, Herkunftskontext und Zielstadt.",
        },
        {
          title: "Interessen intelligent verbinden",
          body:
            "Der Matchmaker sucht nach warmen Kontextuberschneidungen statt nach schnellen Swipe-Signalen.",
        },
        {
          title: "Wochentliche Matches erhalten",
          body:
            "Jeden Montag erscheint ein kleines Dossier mit Menschen, die wirklich zur Situation passen.",
        },
        {
          title: "Lokale Events besuchen",
          body:
            "Kaffeespaziergange, Begrussungskreise und kleine Gemeinschaftsformate schaffen sichere erste Begegnungen.",
        },
        {
          title: "Teil einer Community werden",
          body:
            "Aus Isolation wird ein Netz aus vertrauten Menschen, Ritualen und lokalem Vertrauen.",
        },
      ],
    },
    inside: {
      eyebrow: "IN DER PLATTFORM",
      title: "Ein Produkt, das dich",
      accent: "wieder ins echte Leben bringt.",
      body:
        "Die Plattform bleibt ruhig und klar: Profil, Matches, Veranstaltungen und Services sind so gebaut, dass echte Begegnungen schneller passieren konnen.",
      appTitle: "NeuStart Plattform",
      appVersion: "Berlin Version 1.2",
      tabs: {
        profile: "Profil",
        people: "Menschen",
        matches: "Wochen-Matches",
        events: "Veranstaltungen",
        partners: "Partner",
      },
      descriptions: {
        profile: "Zeige, wer du bist",
        people: "Passende Menschen in deiner Nahe",
        matches: "Kuratiertes Wochen-Dossier",
        events: "Physische Community-Treffen",
        partners: "Geprufte Service-Guides",
      },
      memberBadge: "GEPRUFTES MITGLIED",
      profileTitle: "Meine Neustart-Geschichte",
      interestsTitle: "Kurierte Interessen",
      previewFallback:
        "Vor Kurzem umgezogen und auf der Suche nach warmen lokalen Freundschaften, Design-Gesprachen und kleinen Events, die Deutschland wieder menschlich machen.",
      peopleBadge: "96% Passung",
      weeklyTitle: "Wochen-Dossier • 3 kuratierte Matches",
      matchWhy: "Warum dieser Match passt",
    },
    communities: {
      eyebrow: "FUR COMMUNITY-HOSTS",
      title: "Lass deine lokale Gemeinschaft wachsen.",
      accent: "Warm, organisch und provisionsfrei.",
      body:
        "Ob Buchclub, Startup-Kaffeekreis oder Spaziergangsgruppe: NeuStart hilft Hosts, motivierte neue Ankommende in einem hochwertigen, menschlichen Rahmen zusammenzubringen.",
      bullets: [
        "Empfehlungen gehen nur an Menschen mit echten gemeinsamen Interessen.",
        "Keine versteckte Plattformsteuer auf lokale Gemeinschaftsformate.",
        "Geprufte Hosts und klare Anti-Spam-Mechaniken schutzen die Atmosphare.",
      ],
      primary: "Als Host registrieren",
      secondary: "Richtlinien ansehen",
      trustLabel: "Resonanz der Gemeinschaft",
      trustMetric: "aktive Mitglieder",
      hostRoleA: "Host des Berlin Tech Guild",
      hostRoleB: "Host der Munich Alps Gruppe",
      hostQuoteA:
        "NeuStart half uns, die richtigen Newcomer um einen warmen lokalen Tech-Kreis zu versammeln, ohne die Gruppe in einen bezahlten Funnel zu verwandeln.",
      hostQuoteB:
        "Keine Plattformsteuer, kein lauter Algorithmus, nur Menschen, die ankommen, weil das Format wirklich zu ihnen passt.",
    },
    partners: {
      eyebrow: "GEPRUFTE SERVICE-PARTNER",
      title: "Erreiche engagierte Newcomer",
      accent: "durch echtes Vertrauen.",
      body:
        "NeuStart verkauft keine Sichtbarkeit an den Hochstbietenden. Partner erscheinen dort, wo sie fur den Neustart wirklich sinnvoll sind.",
      cards: [
        {
          title: "Strenge Prufung der Gemeinschaft",
          body:
            "Nur Services mit starkem Feedback, transparenter Preislogik und echtem Mehrwert bleiben sichtbar.",
        },
        {
          title: "Keine Tracking-Cookies",
          body:
            "Keine Weitergabe von Umzugsdaten, Browser-Logs oder versteckten Lead-Interessen.",
        },
      ],
      footer:
        "Partner konnen sich keine hohere Sichtbarkeit kaufen. Empfehlungen entstehen aus Service-Qualitat und Vertrauen der Gemeinschaft.",
    },
    founder: {
      eyebrow: "VISION DES FOUNDERS",
      quote: "Technologie sollte Menschen nicht isolieren.",
      accent: "Sie sollte ihnen helfen, dazuzugehoren.",
      body: [
        "NeuStart entstand aus der Erfahrung, dass Behordenstress nur ein Teil des Neustarts ist. Die eigentliche Leere beginnt oft abends, wenn niemand da ist.",
        "Darum bleibt das Produkt bewusst anti-addictive: kleine wochentliche Dossiers statt unendlicher Feeds und warmer Kontext statt Aufmerksamkeitsmechaniken.",
        "Wir wollen Menschen helfen, lokale Wurzeln zu schlagen, Vertrauen aufzubauen und neue Kapitel in Deutschland nicht allein zu tragen.",
      ],
      noteTitle: "Ethisches Produktversprechen",
      notes: [
        {
          title: "Keine Endlos-Feeds",
          body:
            "NeuStart liefert kleine, hochwertige Updates statt Dauerreize und Aufmerksamkeitssog.",
        },
        {
          title: "Keine verkauften Datenbanken",
          body:
            "Profilkontext, Zielstadt und Interessen bleiben geschutzt und werden nicht als Lead-Layer vermarktet.",
        },
        {
          title: "Keine manipulativen Mechaniken",
          body:
            "Das Produkt fordert echte Treffen, klare Empfehlungen und ruhige Entscheidungen statt Druck und Abhangigkeit.",
        },
      ],
    },
    cta: {
      eyebrow: "SICHERE DIR DEINEN PLATZ BEI NEUSTART",
      title: "Werde Teil von NeuStart.",
      body:
        "Beginne mit deinem Profil und springe direkt in die Plattform. Dort warten wochentliche Matches, lokale Veranstaltungen und geprufte Services auf deinen Neustart.",
      primary: "Profil erstellen",
      secondary: "Plattform offnen",
      pills: ["DSGVO-gepruft", "Hosting in Frankfurt", "Keine Kreditkarte notig"],
    },
    misc: {
      branding: "Plattform fur einen Neuanfang in Deutschland",
      berlin: "Berlin",
      footer:
        "NeuStart ist ein eigenstandiger Premium-Auftritt fur Newcomer in Deutschland. Plattform und Dashboards bleiben als separate Produktbereiche verfugbar.",
      passLabel: "98% Match",
      footerAbout:
        "NeuStart – Plattform fur einen Neuanfang in Deutschland.\n\nWir verbinden Menschen, Communities und hilfreiche Services fur einen leichteren Start.",
      footerNavTitle: "Navigation",
      footerDocsTitle: "Dokumente",
      footerNav: [
        "Warum NeuStart",
        "So funktioniert es",
        "Communities",
        "Veranstaltungen",
        "Partner",
      ],
      footerDocs: [
        "Datenschutzerklarung",
        "Impressum",
        "Nutzungsbedingungen",
        "Community Regeln",
        "Kontakt",
      ],
      footerCreated:
        "Mit 💙 von Menschen entwickelt, die selbst einmal neu anfangen mussten.",
    },
  },
  ru: {
    nav: {
      why: "Почему NeuStart",
      how: "Как это работает",
      communities: "Сообщества",
      events: "События",
      partners: "Партнёры",
      about: "О проекте",
      cta: "Войти / Регистрация",
    },
    areas: {
      landing: "Главная",
      app: "Платформа",
      founder: "Раздел основателя",
      admin: "Раздел администратора",
    },
    hero: {
      eyebrow: "Принадлежность к сообществу — не роскошь. Это необходимость.",
      titleA: "Ваша новая жизнь в Германии",
      titleB: "начинается с людей.",
      body:
        "NeuStart — это тёплая платформа для новичков в Германии. Дружба, локальные встречи, надёжные контакты и полезные сервисы собираются здесь в один понятный и спокойный путь.",
      quote: "Вы больше не одиноки.",
      primary: "Создать профиль",
      secondary: "Найти сообщество",
      proof: "4.9/5 оценка сообщества",
      proofText:
        "Более 14 200 новичков нашли близких по духу людей в первые 60 дней.",
      bot: "Елена рекомендовала уютную встречу за кофе сегодня рядом с Mitte.",
      personRole: "UX-дизайнер • 8 месяцев в Германии",
      personStory:
        "Я приехала, никого не зная. Через пару недель у меня уже были первые прогулки за кофе, новые друзья и чувство, что моя жизнь здесь действительно начинается.",
      tags: ["UX-дизайн", "Спешелти-кофе", "Берлин", "Немецкий B2"],
      precision: "Точность матчмейкера",
      recommendation: "Персональная рекомендация",
      values: "Общие ценности",
    },
    story: {
      eyebrow: "ТИХАЯ РЕАЛЬНОСТЬ ЭМИГРАЦИИ",
      title: "Переезд — это смелость. Но он не должен означать",
      accent: "изоляцию.",
      body:
        "Квартира, Anmeldung, документы — все это видно снаружи. Но настоящая сложность часто начинается вечером, когда рядом нет никого, с кем можно разделить новую жизнь.",
      quote:
        "С кем мне разделить маленькие победы? Кому позвонить, когда зима становится темной?",
      stat: "67% новоприбывших называют одиночество самой тяжелой частью адаптации.",
      statText:
        "Эмоциональная цена нового старта часто оказывается выше, чем весь видимый бюрократический стресс.",
      cards: [
        {
          title: "Нет друзей",
          body:
            "Без первого круга общения даже выходные становятся длинными. Языковой барьер не должен отделять человека от теплых разговоров и живых знакомств.",
          badge: "Одинокие выходные",
        },
        {
          title: "Нет сети контактов",
          body:
            "В Германии многое строится на доверии. Без первых связей сложнее и в жизни, и в работе, и в ощущении опоры.",
          badge: "Невидимые барьеры",
        },
        {
          title: "Нет надежной ориентации",
          body:
            "Обычные форумы часто шумные, устаревшие и перегруженные чужими интересами. Новичкам нужны спокойные и честные рекомендации.",
          badge: "Бюрократический шум",
        },
      ],
    },
    matchmaker: {
      eyebrow: "ИНТЕРАКТИВНЫЙ МАТЧМЕЙКЕР",
      title: "Доверие нельзя автоматизировать.",
      accent: "Оно строится на общих темах.",
      body:
        "Меняйте язык общения и интересы, чтобы увидеть, как NeuStart собирает премиальное недельное досье для нового профиля.",
      language: "Язык общения",
      interests: "Ключевые интересы",
      reason: "Почему возникает этот мэтч",
      copy: "Использовать фразу для знакомства",
      copied: "Скопировано",
      ethicsTitle: "Этичный матчмейкинг:",
      ethicsText:
        "NeuStart обновляет рекомендации только раз в неделю, чтобы поощрять реальные встречи, а не бесконечный скролл.",
      summary: "Недельное досье • 3 кураторских мэтча",
      intensity: "Сила совпадения интересов",
      compatibility: "Совместимость",
    },
    steps: {
      eyebrow: "МЕТОДИКА NEUSTART",
      title: "Продукт в человеческом темпе.",
      accent: "Шаг за шагом.",
      body:
        "NeuStart — это не бесконечная лента. Это спокойный путь от экрана к настоящему локальному сообществу.",
      items: [
        {
          title: "Создать профиль",
          body:
            "Легкий онбординг собирает язык, интересы, контекст переезда и город нового старта.",
        },
        {
          title: "AI связывает интересы",
          body:
            "Матчмейкер ищет теплые пересечения по интересам и жизненному контексту, а не поверхностные сигналы.",
        },
        {
          title: "Получать еженедельные подборки",
          body:
            "Каждый понедельник появляется небольшое досье с людьми, которые действительно подходят именно вам.",
        },
        {
          title: "Посещать локальные встречи",
          body:
            "Прогулки за кофе, приветственные круги и небольшие форматы сообщества создают безопасные первые знакомства.",
        },
        {
          title: "Стать частью сообщества",
          body:
            "Изоляция постепенно меняется на знакомые лица, локальные ритуалы и доверие к новому месту.",
        },
      ],
    },
    inside: {
      eyebrow: "ВНУТРИ ПЛАТФОРМЫ",
      title: "Продукт, который помогает",
      accent: "снова выйти в офлайн.",
      body:
        "Платформа остается спокойной и ясной: профиль, еженедельные подборки, события и проверенные сервисы нужны не ради скролла, а ради настоящих встреч.",
      appTitle: "Платформа NeuStart",
      appVersion: "Берлин версия 1.2",
      tabs: {
        profile: "Профиль",
        people: "Люди",
        matches: "Подборки недели",
        events: "События",
        partners: "Партнеры",
      },
      descriptions: {
        profile: "Показать, кто вы",
        people: "Подходящие люди рядом",
        matches: "Кураторское недельное досье",
        events: "Живые встречи сообщества",
        partners: "Проверенные сервисы",
      },
      memberBadge: "ПРОВЕРЕННЫЙ УЧАСТНИК",
      profileTitle: "Моя история нового старта",
      interestsTitle: "Кураторские интересы",
      previewFallback:
        "Недавно переехала и ищу теплые локальные знакомства, разговоры о дизайне и маленькие события, которые снова делают Германию живой и человеческой.",
      peopleBadge: "96% совпадение",
      weeklyTitle: "Недельное досье • 3 кураторских мэтча",
      matchWhy: "Почему это мэтч",
    },
    communities: {
      eyebrow: "ДЛЯ ХОСТОВ И СООБЩЕСТВ",
      title: "Помогите своей локальной группе расти.",
      accent: "Тепло, органично и без комиссий.",
      body:
        "Книжный клуб, круг встреч за кофе или прогулочная группа — NeuStart помогает собрать мотивированных новичков в качественном и человечном формате.",
      bullets: [
        "Рекомендации получают только люди с реальными общими интересами.",
        "Никаких скрытых комиссий на локальные форматы сообщества.",
        "Проверенные хосты и anti-spam механики защищают атмосферу доверия.",
      ],
      primary: "Стать хостом",
      secondary: "Посмотреть правила",
      trustLabel: "Резонанс сообщества",
      trustMetric: "активных участников",
      hostRoleA: "Хост Berlin Tech Guild",
      hostRoleB: "Хост Munich Alps",
      hostQuoteA:
        "NeuStart помог собрать правильных новичков вокруг теплого локального tech-сообщества без ощущения платной воронки.",
      hostQuoteB:
        "Комиссий нет, шумного алгоритма тоже нет — приходят люди, которым этот формат действительно подходит.",
    },
    partners: {
      eyebrow: "ПРОВЕРЕННЫЕ СЕРВИС-ПАРТНЕРЫ",
      title: "Достигайте вовлеченных новичков",
      accent: "через настоящее доверие.",
      body:
        "NeuStart не продает видимость тому, кто заплатил больше. Партнеры появляются именно там, где они действительно полезны для нового старта.",
      cards: [
        {
          title: "Строгая проверка сообщества",
          body:
            "Видимыми остаются только сервисы с сильным feedback, прозрачной ценой и реальной ценностью.",
        },
        {
          title: "Никаких tracking cookies",
          body:
            "Никакой продажи данных о переезде, браузерных логов и скрытых lead-механик.",
        },
      ],
      footer:
        "Партнеры не могут купить себе более высокую видимость. Рекомендации появляются из качества сервиса и доверия сообщества.",
    },
    founder: {
      eyebrow: "ВИДЕНИЕ ОСНОВАТЕЛЯ",
      quote: "Технологии не должны изолировать людей.",
      accent: "Они должны помогать им чувствовать принадлежность.",
      body: [
        "NeuStart вырос из личного ощущения, что бюрократия — лишь часть нового старта. Настоящая пустота начинается тогда, когда вечером рядом никого нет.",
        "Поэтому продукт сознательно anti-addictive: маленькие weekly dossiers вместо бесконечных лент и теплый контекст вместо борьбы за внимание.",
        "Мы хотим, чтобы люди строили локальные корни, находили доверие и не проходили новую жизнь в Германии в одиночестве.",
      ],
      noteTitle: "Этические гарантии продукта",
      notes: [
        {
          title: "Никаких бесконечных лент",
          body:
            "NeuStart приносит маленькие качественные обновления вместо постоянного потока раздражающих стимулов.",
        },
        {
          title: "Никаких проданных баз данных",
          body:
            "Контекст профиля, город и интересы не превращаются в товар и не продаются как лиды.",
        },
        {
          title: "Никаких манипулятивных механик",
          body:
            "Продукт поощряет реальные встречи, понятные рекомендации и спокойные решения вместо давления и зависимости.",
        },
      ],
    },
    cta: {
      eyebrow: "ВАШЕ МЕСТО В NEUSTART",
      title: "Присоединяйтесь к NeuStart.",
      body:
        "Начните с профиля и сразу переходите в платформу. Там вас ждут еженедельные подборки, локальные события и проверенные сервисы для мягкого нового старта.",
      primary: "Создать профиль",
      secondary: "Открыть платформу",
      pills: ["Проверено по GDPR", "Хостинг во Франкфурте", "Без банковской карты"],
    },
    misc: {
      branding: "Платформа для новой жизни в Германии",
      berlin: "Берлин",
      footer:
        "NeuStart — это отдельный премиальный лендинг для новичков в Германии. Приложение и дашборды остаются доступными как отдельные продуктовые секции.",
      passLabel: "98% мэтч",
      footerAbout:
        "NeuStart — платформа для новой жизни в Германии.\n\nМы объединяем людей, сообщества и полезные сервисы, помогая быстрее стать частью новой страны.",
      footerNavTitle: "Навигация",
      footerDocsTitle: "Документы",
      footerNav: [
        "Почему NeuStart",
        "Как это работает",
        "Сообщества",
        "События",
        "Партнёры",
      ],
      footerDocs: [
        "Datenschutzerklärung",
        "Impressum",
        "Nutzungsbedingungen",
        "Community Regeln",
        "Kontakt",
      ],
      footerCreated:
        "Создано с 💙 людьми, которые сами однажды начинали всё заново.",
    },
  },
};

const heroPhotos = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
];

const showcaseTabs: ShowcaseTab[] = ["profile", "people", "matches", "events", "partners"];
const interestOptions = [
  "UX-Design",
  "Spezialitatenkaffee",
  "Hiking",
  "Contemporary Art",
  "Techno",
  "Book Club",
];

const languageChoices: Record<Locale, string[]> = {
  de: ["Russisch", "Russisch & Deutsch", "Deutsch"],
  ru: ["Русский и английский", "Русский и немецкий", "Только английский"],
};

const landingFallbackPeople: Record<Locale, Person[]> = {
  de: [
    {
      id: 101,
      name: "Anna Krause",
      age: 33,
      city: "Berlin",
      profession: "Community-Aufbau",
      language: "B2",
      about:
        "Anna hilft neuen Mitgliedern dabei, erste lokale Kontakte, Sprachgruppen und sichere Community-Formate in Berlin zu finden.",
      interests: ["Deutsch", "Community", "Dokumente", "Freunde"],
      lookingFor: ["Freunde", "Community", "Lokale Tipps"],
      reason: "Gleiche Stadt, ahnliche Lebensphase und viel Erfahrung mit einem sanften Neustart.",
      status: "Aktiv",
    },
    {
      id: 102,
      name: "Roman Keller",
      age: 38,
      city: "Hamburg",
      profession: "Beruflicher Neustart",
      language: "B1",
      about:
        "Roman sucht ehrliche Kontakte fur Alltag, Arbeit und gegenseitige Unterstutzung beim Ankommen in Hamburg.",
      interests: ["Karriere", "Familie", "Netzwerken"],
      lookingFor: ["Mentor", "Freunde", "Community"],
      reason: "Starker Fokus auf Neuorientierung, Alltag und erste vertrauensvolle Gesprachspartner.",
      status: "Neu",
    },
    {
      id: 103,
      name: "Elena Vogt",
      age: 29,
      city: "Munchen",
      profession: "UX-Forschung",
      language: "C1",
      about:
        "Elena verbindet Kultur, Sprache und Arbeitsthemen und offnet gern warme neue Kreise in Munchen.",
      interests: ["Kultur", "Freunde", "Karriere"],
      lookingFor: ["Events", "Community", "Kontakte"],
      reason: "Hilft bei Sprache, kultureller Orientierung und ersten sozialen Schritten.",
      status: "Top-Match",
    },
  ],
  ru: [
    {
      id: 101,
      name: "Анна Краузе",
      age: 33,
      city: "Берлин",
      profession: "Развитие сообщества",
      language: "B2",
      about:
        "Анна помогает новичкам находить первые локальные контакты, языковые группы и безопасные форматы сообщества в Берлине.",
      interests: ["Немецкий язык", "Сообщество", "Документы", "Друзья"],
      lookingFor: ["Друзей", "Сообщество", "Локальные советы"],
      reason: "Тот же город, похожий жизненный этап и большой опыт мягкой адаптации.",
      status: "Активен",
    },
    {
      id: 102,
      name: "Роман Келлер",
      age: 38,
      city: "Гамбург",
      profession: "Карьерный перезапуск",
      language: "B1",
      about:
        "Роман ищет честные знакомства для разговоров о быте, работе и взаимной поддержке в Гамбурге.",
      interests: ["Карьера", "Семья", "Нетворкинг"],
      lookingFor: ["Наставника", "Друзей", "Сообщество"],
      reason: "Сильный фокус на новой опоре, профессии и первых доверительных разговорах.",
      status: "Новый",
    },
    {
      id: 103,
      name: "Елена Фогт",
      age: 29,
      city: "Мюнхен",
      profession: "UX-исследователь",
      language: "C1",
      about:
        "Елена соединяет темы культуры, языка и работы и помогает мягко входить в новые круги общения в Мюнхене.",
      interests: ["Культура", "Друзья", "Карьера"],
      lookingFor: ["События", "Сообщество", "Контакты"],
      reason: "Может помочь с языком, культурной ориентацией и первыми социальными шагами.",
      status: "Топ-матч",
    },
  ],
};

const landingFallbackEvents: Record<Locale, EventItem[]> = {
  de: [
    {
      title: "Begrussungskreis Berlin",
      city: "Berlin",
      date: "Dienstag, 19:00",
      format: "Offline",
      description:
        "Ein warmer erster Abend mit lokalen Tipps, kleinen Intros und ruhigen Gesprachen fur neue Mitglieder.",
      seatsLeft: "12 Platze frei",
    },
    {
      title: "Karriere-Neustart Kaffee",
      city: "Hamburg",
      date: "Donnerstag, 18:30",
      format: "Hybrid",
      description:
        "Ein ehrlicher Austausch uber Sprache, Lebenslauf und die ersten Schritte im deutschen Arbeitsmarkt.",
      seatsLeft: "8 Platze frei",
    },
  ],
  ru: [
    {
      title: "Приветственный круг в Берлине",
      city: "Берлин",
      date: "Вторник, 19:00",
      format: "Оффлайн",
      description:
        "Тёплый первый вечер с локальными советами, спокойными знакомствами и поддержкой для новых участников.",
      seatsLeft: "12 мест свободно",
    },
    {
      title: "Кофе-встреча про карьерный перезапуск",
      city: "Гамбург",
      date: "Четверг, 18:30",
      format: "Гибрид",
      description:
        "Честный разговор о языке, резюме и первых шагах на немецком рынке труда.",
      seatsLeft: "8 мест свободно",
    },
  ],
};

const landingFallbackPartners: Record<Locale, PartnerItem[]> = {
  de: [
    {
      title: "Versicherungsbegleitung",
      category: "Versicherung",
      description:
        "Hilft bei Krankenkasse, Grundschutz und den ersten organisatorischen Schritten nach dem Umzug.",
      offer: "Vertrauenswurdiger Partner-Slot",
    },
    {
      title: "Sprach-Sprint",
      category: "Sprache",
      description:
        "Alltagsnahes Deutsch mit Community-Nahe, Wochenzielen und einem ruhigen Lernrhythmus.",
      offer: "Community-Angebot fur den Pilot",
    },
  ],
  ru: [
    {
      title: "Помощь со страхованием",
      category: "Страхование",
      description:
        "Помогает разобраться с Krankenkasse, базовой защитой и первыми организационными шагами после переезда.",
      offer: "Надёжный партнёрский слот",
    },
    {
      title: "Языковой спринт",
      category: "Язык",
      description:
        "Разговорный немецкий с поддержкой сообщества, недельными целями и спокойным ритмом обучения.",
      offer: "Предложение сообщества для пилота",
    },
  ],
};

export function LandingSurface({
  locale,
  people,
  events,
  services,
  partners,
  primaryCtaLabel,
  secondaryCtaLabel,
  onCreateProfile,
  onFindCommunity,
  onSecondaryCta,
  onOpenAppScreen,
  onSetLocale,
}: LandingSurfaceProps) {
  const copy = copyByLocale[locale];
  const landingPeople = people.length > 0 ? people : landingFallbackPeople[locale];
  const landingEvents = events.length > 0 ? events : landingFallbackEvents[locale];
  const landingPartners = partners.length > 0 ? partners : landingFallbackPartners[locale];
  const [matchLanguage, setMatchLanguage] = useState(languageChoices[locale][0]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "UX-дизайн",
    "Спешелти-кофе",
  ]);
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>("matches");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const resolvedPrimaryCtaLabel = primaryCtaLabel ?? copy.hero.primary;
  const resolvedSecondaryCtaLabel = secondaryCtaLabel ?? copy.hero.secondary;

  const matchCards = useMemo(() => {
    return landingPeople.slice(0, 3).map((person, index) => {
      const lead = selectedInterests[index % selectedInterests.length] ?? "Community";
      const score = Math.min(94 + index * 2, 99);
      const note =
        locale === "ru"
          ? `У вас пересекаются ${lead}, контекст города ${person.city} и похожая мотивация к мягкому новому старту.`
          : `Ihr teilt ${lead}, den Stadtkontext ${person.city} und eine ahnliche Motivation fur einen sanften Neustart.`;
      const icebreaker =
        locale === "ru"
          ? `Привет! Похоже, нам обоим близки ${lead} и спокойные локальные встречи. Может, начнем с кофе на этой неделе?`
          : `Hi! Uns verbinden ${lead} und ruhige lokale Treffen. Wollen wir diese Woche mit einem Kaffee starten?`;
      return { person, score, note, icebreaker };
    });
  }, [landingPeople, locale, selectedInterests]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleInterest(interest: string) {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.length === 1
          ? current
          : current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  function copyIcebreaker(id: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#f3f6fb_34%,#eef4ff_100%)] text-[#132238]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(86,140,255,0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute left-[-120px] top-[360px] h-[300px] w-[300px] rounded-full bg-[#dce8ff] blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-[720px] h-[340px] w-[340px] rounded-full bg-[#d7e4ff] blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-[#dce6f5]/80 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-4 px-4 py-4 sm:items-center sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("landing-top")} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#007AFF,#7AA7FF)] text-lg font-bold text-white shadow-[0_20px_45px_-25px_rgba(0,122,255,0.85)]">
              N
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold tracking-[-0.04em] text-[#132238]">NeuStart</div>
              <div className="max-w-[190px] text-[10px] uppercase tracking-[0.2em] text-[#6d84a5] sm:max-w-none sm:tracking-[0.28em]">
                {copy.misc.branding}
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-5 text-sm font-medium text-[#5f7391] lg:flex">
            <button onClick={() => scrollTo("story")} className="transition-colors hover:text-[#132238]">
              {copy.nav.why}
            </button>
            <button onClick={() => scrollTo("steps")} className="transition-colors hover:text-[#132238]">
              {copy.nav.how}
            </button>
            <button onClick={() => scrollTo("communities")} className="transition-colors hover:text-[#132238]">
              {copy.nav.communities}
            </button>
            <button
              onClick={() => {
                setShowcaseTab("events");
                scrollTo("inside");
              }}
              className="transition-colors hover:text-[#132238]"
            >
              {copy.nav.events}
            </button>
            <button onClick={() => scrollTo("partners")} className="transition-colors hover:text-[#132238]">
              {copy.nav.partners}
            </button>
            <button onClick={() => scrollTo("about")} className="transition-colors hover:text-[#132238]">
              {copy.nav.about}
            </button>
          </nav>

          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <div className="flex items-center rounded-full border border-[#d7e3f4] bg-[#f7fbff] p-1 text-xs font-semibold text-[#5f7391]">
              {(["ru", "de"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => onSetLocale(item)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    locale === item
                      ? "bg-[#0f172a] text-white shadow-sm"
                      : "text-[#627894] hover:text-[#132238]"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={onCreateProfile}
              className="hidden rounded-full bg-[#0f172a] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1e293b] sm:inline-flex"
            >
              {primaryCtaLabel ?? copy.nav.cta}
            </button>
          </div>
        </div>
        <div className="border-t border-[#dce6f5]/70 px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 text-sm font-medium text-[#5f7391] [scrollbar-width:none]">
            <button
              onClick={() => scrollTo("story")}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.why}
            </button>
            <button
              onClick={() => scrollTo("steps")}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.how}
            </button>
            <button
              onClick={() => scrollTo("communities")}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.communities}
            </button>
            <button
              onClick={() => {
                setShowcaseTab("events");
                scrollTo("inside");
              }}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.events}
            </button>
            <button
              onClick={() => scrollTo("partners")}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.partners}
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="shrink-0 rounded-full border border-[#d7e3f4] bg-white px-3 py-2 transition-colors hover:text-[#132238]"
            >
              {copy.nav.about}
            </button>
          </div>
        </div>
      </header>

      <section id="landing-top" className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#d8e5fb] bg-white px-4 py-2 text-left text-xs font-semibold uppercase leading-5 tracking-[0.14em] text-[#4c75d8] shadow-[0_18px_44px_-30px_rgba(49,92,198,0.45)] sm:tracking-[0.18em]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{copy.hero.eyebrow}</span>
            </div>

            <h1 className="mt-8 max-w-4xl font-['Playfair_Display'] text-[2.85rem] leading-[0.98] tracking-[-0.04em] text-[#142136] sm:text-6xl lg:text-7xl">
              {copy.hero.titleA}
              <br />
              <span className="bg-[linear-gradient(135deg,#132238_0%,#4b74d8_45%,#7aa7ff_100%)] bg-clip-text text-transparent">
                {copy.hero.titleB}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#526882] sm:text-lg">{copy.hero.body}</p>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#4b74d8]">
              <span className="h-2 w-2 rounded-full bg-[#4b74d8]" />
              <span>{copy.hero.quote}</span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onCreateProfile}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#132238] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_28px_60px_-35px_rgba(19,34,56,0.7)] transition-all hover:bg-[#1d2d47]"
              >
                {resolvedPrimaryCtaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onSecondaryCta ?? onFindCommunity}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8e3f2] bg-white px-6 py-3.5 text-sm font-semibold text-[#21324b] transition-all hover:border-[#bfd5ff] hover:bg-[#f8fbff]"
              >
                <Compass className="h-4 w-4 text-[#4b74d8]" />
                {resolvedSecondaryCtaLabel}
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-[#dfe7f5] pt-8 sm:flex-row sm:items-center">
              <div className="flex -space-x-3">
                {heroPhotos.map((photo, index) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={`member-${index + 1}`}
                    className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[#4b74d8]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-[#5b6f8c]">{copy.hero.proof}</span>
                </div>
                <p className="mt-1 text-sm text-[#5b6f8c]">{copy.hero.proofText}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(122,167,255,0.32),transparent_46%),radial-gradient(circle_at_bottom_left,rgba(0,122,255,0.18),transparent_42%)] blur-2xl" />
            <div className="relative space-y-5">
              <div className="w-full items-center gap-3 rounded-[26px] border border-white/85 bg-white/90 p-4 shadow-[0_25px_50px_-35px_rgba(39,71,132,0.4)] sm:ml-auto sm:flex sm:w-[78%]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#4b74d8]">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div className="mt-3 sm:mt-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#7387a3]">NEUSTART BOT</p>
                  <p className="mt-1 text-sm font-semibold text-[#132238]">{copy.hero.bot}</p>
                </div>
              </div>

              <div className="rounded-[34px] border border-white/80 bg-white/92 p-6 shadow-[0_45px_100px_-55px_rgba(46,77,138,0.45)]">
                <div className="flex items-center gap-4">
                  <img
                    src={heroPhotos[0]}
                    alt="elena"
                    className="h-16 w-16 rounded-[22px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#132238]">Elena K.</h3>
                      <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4b74d8]">
                        {copy.misc.berlin}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#6b7f9c]">{copy.hero.personRole}</p>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-8 text-[#50657f]">{copy.hero.personStory}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.hero.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d9e6fb] bg-[#f7fbff] px-3 py-1.5 text-xs font-medium text-[#324760]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mr-auto flex w-[72%] items-center justify-between rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-[0_25px_50px_-35px_rgba(39,71,132,0.35)]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#7387a3]">{copy.hero.precision}</p>
                  <p className="mt-1 text-sm font-semibold text-[#132238]">{copy.hero.recommendation}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#4b74d8]">{copy.misc.passLabel}</span>
                  <p className="mt-1 text-[11px] text-[#7387a3]">{copy.hero.values}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#e0e9f6] bg-white/90 px-6 py-8 shadow-[0_35px_90px_-65px_rgba(39,71,132,0.28)] sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.story.eyebrow}</p>
              <h2 className="mt-4 max-w-xl font-['Playfair_Display'] text-4xl leading-tight tracking-[-0.04em] text-[#132238] sm:text-5xl">
                {copy.story.title}
                <br />
                <span className="text-[#4b74d8]">{copy.story.accent}</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-8 text-[#5b6f8c]">{copy.story.body}</p>
              <blockquote className="mt-8 border-l-2 border-[#4b74d8] pl-4 font-['Playfair_Display'] text-2xl leading-9 text-[#132238]">
                {copy.story.quote}
              </blockquote>
              <div className="mt-8 rounded-[26px] bg-[#f7fbff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4b74d8]">{copy.story.stat}</p>
                <p className="mt-3 text-sm leading-7 text-[#5b6f8c]">{copy.story.statText}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {copy.story.cards.map((card, index) => (
                <article key={card.title} className="rounded-[28px] border border-[#e2ebf7] bg-[#fbfdff] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#4b74d8]">
                        {index === 0 ? (
                          <Users className="h-5 w-5" />
                        ) : index === 1 ? (
                          <Compass className="h-5 w-5" />
                        ) : (
                          <ShieldCheck className="h-5 w-5" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-[#132238]">{card.title}</h3>
                    </div>
                    <span className="rounded-full bg-[#f2f6fc] px-3 py-1 text-[11px] font-medium text-[#7387a3]">
                      {card.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-8 text-[#5b6f8c]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="matchmaker" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#dbe6f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-6 py-8 shadow-[0_35px_90px_-65px_rgba(39,71,132,0.28)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.matchmaker.eyebrow}</p>
              <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">
                {copy.matchmaker.title}
                <br />
                <span className="text-[#4b74d8]">{copy.matchmaker.accent}</span>
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-[#5b6f8c]">{copy.matchmaker.body}</p>

              <div className="mt-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7f9c]">
                  {copy.matchmaker.language}
                </p>
                <div className="grid gap-2">
                  {languageChoices[locale].map((item) => (
                    <button
                      key={item}
                      onClick={() => setMatchLanguage(item)}
                      className={`rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                        matchLanguage === item
                          ? "border-[#bfd5ff] bg-[#eef5ff] text-[#1d4ed8]"
                          : "border-[#d8e3f2] bg-white text-[#607590] hover:border-[#bfd5ff]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7f9c]">
                  {copy.matchmaker.interests}
                </p>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? "border-[#bfd5ff] bg-[#eef5ff] text-[#1d4ed8]"
                            : "border-[#d8e3f2] bg-white text-[#607590] hover:border-[#bfd5ff]"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {matchCards.slice(0, 2).map(({ person, score, note, icebreaker }) => (
                <article
                  key={person.id}
                  className="rounded-[28px] border border-[#e0e9f6] bg-white p-5 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.22)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={heroPhotos[(person.id - 1) % heroPhotos.length]}
                        alt={person.name}
                        className="h-14 w-14 rounded-[18px] object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-[#132238]">{person.name}</h3>
                          <span className="rounded-full bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4b74d8]">
                            {locale === "ru" ? `${score}% мэтч` : `${score}% Match`}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-[#6b7f9c]">{person.profession}</p>
                        <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#7387a3]">
                          <MapPin className="h-3.5 w-3.5" />
                          {person.city} • {matchLanguage}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => copyIcebreaker(person.id, icebreaker)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        copiedId === person.id
                          ? "bg-[#e8fbf2] text-[#0f9f64]"
                          : "bg-[#132238] text-white hover:bg-[#1d2d47]"
                      }`}
                    >
                      {copiedId === person.id ? copy.matchmaker.copied : copy.matchmaker.copy}
                    </button>
                  </div>

                  <div className="mt-4 rounded-[22px] bg-[#f7fbff] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4b74d8]">
                      {copy.matchmaker.reason}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#5b6f8c]">{note}</p>
                  </div>

                  <p className="mt-4 rounded-[22px] border border-[#e0e9f6] bg-white px-4 py-3 text-sm italic leading-7 text-[#324760]">
                    {icebreaker}
                  </p>
                </article>
              ))}

              <div className="rounded-[26px] border border-[#dbe6f5] bg-[#f7fbff] p-5">
                <p className="text-sm leading-7 text-[#5b6f8c]">
                  <span className="font-semibold text-[#132238]">{copy.matchmaker.ethicsTitle} </span>
                  {copy.matchmaker.ethicsText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.steps.eyebrow}</p>
          <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">
            {copy.steps.title}
            <br />
            <span className="text-[#4b74d8]">{copy.steps.accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-[#5b6f8c]">{copy.steps.body}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {copy.steps.items.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[28px] border border-[#e0e9f6] bg-white/90 p-5 shadow-[0_25px_50px_-40px_rgba(39,71,132,0.18)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-sm font-semibold text-[#4b74d8]">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#132238]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5b6f8c]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="inside" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#dbe6f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-6 py-8 shadow-[0_35px_90px_-65px_rgba(39,71,132,0.28)] sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.inside.eyebrow}</p>
            <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">
              {copy.inside.title}
              <br />
              <span className="text-[#4b74d8]">{copy.inside.accent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-[#5b6f8c]">{copy.inside.body}</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div className="space-y-3">
              {showcaseTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setShowcaseTab(tab)}
                  className={`flex w-full items-center gap-4 rounded-[24px] border px-4 py-4 text-left transition-all ${
                    showcaseTab === tab
                      ? "border-[#bfd5ff] bg-[#eef5ff] text-[#132238]"
                      : "border-[#e0e9f6] bg-white text-[#607590] hover:border-[#d1def1]"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#4b74d8] shadow-sm">
                    {tab === "profile" ? (
                      <Users className="h-5 w-5" />
                    ) : tab === "people" ? (
                      <Compass className="h-5 w-5" />
                    ) : tab === "matches" ? (
                      <Star className="h-5 w-5" />
                    ) : tab === "events" ? (
                      <CalendarDays className="h-5 w-5" />
                    ) : (
                      <BriefcaseBusiness className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-current">{copy.inside.tabs[tab]}</h3>
                    <p className="mt-0.5 text-xs text-[#6b7f9c]">{copy.inside.descriptions[tab]}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mx-auto w-full max-w-[620px] rounded-[38px] bg-[#0b1221] p-4 shadow-[0_60px_120px_-60px_rgba(10,18,33,0.9)]">
              <div className="overflow-hidden rounded-[30px] border border-white/8 bg-[#050816]">
                <div className="flex items-center justify-between border-b border-white/8 bg-[#0b1221]/90 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#007AFF,#7AA7FF)] text-xs font-bold text-white">
                      N
                    </div>
                    <span className="text-[11px] font-semibold text-white">{copy.inside.appTitle}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#8FA8D6]">{copy.inside.appVersion}</span>
                </div>

                <div className="min-h-[460px] p-4">
                  {showcaseTab === "profile" && (
                    <div className="space-y-4">
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={heroPhotos[0]}
                            alt={landingPeople[0]?.name ?? "member"}
                            className="h-16 w-16 rounded-[22px] object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-white">
                                {landingPeople[0]?.name ?? "Alisa Petrova"}
                              </h3>
                              <span className="rounded-full bg-[#0f2f1f] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6ee7b7]">
                                {copy.inside.memberBadge}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-[#9DB0C8]">
                              {landingPeople[0]?.profession ?? copy.inside.previewFallback} •{" "}
                              {landingPeople[0]?.city ?? copy.misc.berlin}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 rounded-[20px] border border-white/8 bg-black/20 p-4">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8FA8D6]">{copy.inside.profileTitle}</p>
                          <p className="mt-2 text-sm leading-7 text-[#D7E0EE]">
                            {landingPeople[0]?.about ?? copy.inside.previewFallback}
                          </p>
                        </div>

                        <div className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-[#8FA8D6]">{copy.inside.interestsTitle}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(landingPeople[0]?.interests.slice(0, 4) ?? interestOptions.slice(0, 4)).map((interest) => (
                              <span
                                key={interest}
                                className="rounded-full border border-[#274773] bg-[#0f1a2c] px-3 py-1 text-[11px] text-white"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showcaseTab === "people" && (
                    <div className="space-y-3">
                      {landingPeople.slice(0, 2).map((person) => (
                        <button
                          key={person.id}
                          onClick={() => onOpenAppScreen("people")}
                          className="w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold text-white">{person.name}</h3>
                              <p className="mt-1 text-xs text-[#9DB0C8]">{person.city} • {person.profession}</p>
                            </div>
                            <span className="rounded-full bg-[#11223b] px-2.5 py-1 text-[10px] font-semibold text-[#8EC5FF]">
                              {copy.inside.peopleBadge}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[#D7E0EE]">{person.about}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {showcaseTab === "matches" && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-[#274773] bg-[#0b1a2e] p-3 text-xs text-[#8EC5FF]">
                        {copy.inside.weeklyTitle}
                      </div>
                      {matchCards.slice(0, 1).map(({ person, note, icebreaker, score }) => (
                        <div key={person.id} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
                          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#8FA8D6]">
                              {copy.matchmaker.intensity}
                            </span>
                            <span className="text-xs font-semibold text-[#8EC5FF]">
                              {score}% {copy.matchmaker.compatibility}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center gap-3">
                            <img
                              src={heroPhotos[(person.id - 1) % heroPhotos.length]}
                              alt={person.name}
                              className="h-11 w-11 rounded-xl object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-white">{person.name}</h3>
                              <p className="text-xs text-[#9DB0C8]">{person.profession}</p>
                            </div>
                          </div>
                          <div className="mt-4 rounded-xl border border-white/8 bg-[#0b1a2e] p-3">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8FA8D6]">{copy.inside.matchWhy}</p>
                            <p className="mt-2 text-sm leading-7 text-[#D7E0EE]">{note}</p>
                          </div>
                          <p className="mt-4 rounded-xl border border-white/8 bg-black/20 p-3 text-sm italic leading-7 text-white">
                            {icebreaker}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {showcaseTab === "events" && (
                    <div className="space-y-3">
                      {landingEvents.slice(0, 2).map((event) => (
                        <button
                          key={event.title}
                          onClick={() => onOpenAppScreen("events")}
                          className="w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="rounded-full bg-[#11223b] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8EC5FF]">
                                {event.format}
                              </span>
                              <h3 className="mt-3 text-sm font-semibold text-white">{event.title}</h3>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-white">{event.date}</p>
                              <p className="mt-1 text-[11px] text-[#9DB0C8]">{event.city}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[#D7E0EE]">{event.description}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {showcaseTab === "partners" && (
                    <div className="space-y-3">
                      {landingPartners.slice(0, 2).map((partner) => (
                        <div key={partner.title} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold text-white">{partner.title}</h3>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#8FA8D6]">{partner.category}</p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8EC5FF]">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              4.8
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[#D7E0EE]">{partner.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="communities" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[34px] border border-[#e0e9f6] bg-white/92 p-6 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.26)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.communities.eyebrow}</p>
            <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">
              {copy.communities.title}
              <br />
              <span className="text-[#4b74d8]">{copy.communities.accent}</span>
            </h2>
            <p className="mt-6 text-[15px] leading-8 text-[#5b6f8c]">{copy.communities.body}</p>

            <div className="mt-7 space-y-4">
              {copy.communities.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#eef5ff] text-[#4b74d8]">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-sm leading-7 text-[#5b6f8c]">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-[#132238] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1d2d47]">
                {copy.communities.primary}
              </button>
              <button className="rounded-full border border-[#d8e3f2] bg-[#f8fbff] px-5 py-3 text-sm font-semibold text-[#21324b] transition-all hover:border-[#bfd5ff]">
                {copy.communities.secondary}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                name: "Alexey Gorkov",
                role: copy.communities.hostRoleA,
                quote: copy.communities.hostQuoteA,
                metric: "64+",
              },
              {
                name: "Tatyana Volkova",
                role: copy.communities.hostRoleB,
                quote: copy.communities.hostQuoteB,
                metric: "18",
              },
            ].map((host, index) => (
              <article
                key={host.name}
                className="rounded-[30px] border border-[#e0e9f6] bg-white/92 p-6 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.22)]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={heroPhotos[(index + 1) % heroPhotos.length]}
                    alt={host.name}
                    className="h-14 w-14 rounded-[20px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-[#132238]">{host.name}</h3>
                    <p className="mt-1 text-sm text-[#6b7f9c]">{host.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-8 text-[#5b6f8c]">{host.quote}</p>

                <div className="mt-5 flex items-center justify-between border-t border-[#e6eef8] pt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7f9c]">
                    {copy.communities.trustLabel}
                  </span>
                  <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-sm font-semibold text-[#4b74d8]">
                    {host.metric} {copy.communities.trustMetric}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#e0e9f6] bg-white/92 px-6 py-8 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.26)] sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.partners.eyebrow}</p>
              <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">
                {copy.partners.title}
                <br />
                <span className="text-[#4b74d8]">{copy.partners.accent}</span>
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-[#5b6f8c]">{copy.partners.body}</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {copy.partners.cards.map((card, index) => (
                  <div key={card.title} className="rounded-[24px] bg-[#f7fbff] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#4b74d8] shadow-sm">
                      {index === 0 ? <ShieldCheck className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </div>
                    <h3 className="text-base font-semibold text-[#132238]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5b6f8c]">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {partners.slice(0, 3).map((partner, index) => (
                <article
                  key={partner.title}
                  className="rounded-[28px] border border-[#e0e9f6] bg-[#fbfdff] p-5"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3 md:hidden">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4b74d8]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {4.7 + index / 10}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-[#132238]">{partner.title}</h3>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#6b7f9c]">{partner.category}</p>
                      </div>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#5b6f8c]">{partner.description}</p>
                    </div>

                    <div className="md:w-[220px] md:shrink-0">
                      <div className="hidden md:flex md:justify-end">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4b74d8]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {4.7 + index / 10}
                        </span>
                      </div>

                      <div className="border-t border-[#e6eef8] pt-4 text-xs font-semibold leading-6 text-[#4b74d8] md:mt-10">
                        {partner.offer}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[24px] border border-[#dce6f5] bg-[#f7fbff] p-5 text-sm leading-7 text-[#5b6f8c]">
            <span className="font-semibold text-[#132238]">{copy.partners.footer}</span>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[36px] border border-[#e0e9f6] bg-white/92 p-6 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.26)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.founder.eyebrow}</p>
            <h2 className="mt-4 font-['Playfair_Display'] text-4xl leading-tight tracking-[-0.04em] text-[#132238] sm:text-5xl">
              {copy.founder.quote}
              <br />
              <span className="text-[#4b74d8]">{copy.founder.accent}</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-8 text-[#5b6f8c]">
              {copy.founder.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-[#e0e9f6] bg-white/92 p-6 shadow-[0_30px_80px_-55px_rgba(39,71,132,0.26)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.founder.noteTitle}</p>
            <div className="mt-5 space-y-4">
              {copy.founder.notes.map((item) => (
                <div key={item.title} className="rounded-[24px] bg-[#f7fbff] p-5">
                  <h3 className="text-base font-semibold text-[#132238]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5b6f8c]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[40px] border border-[#dbe6f5] bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)] px-6 py-10 text-center shadow-[0_35px_90px_-65px_rgba(39,71,132,0.28)] sm:px-8 lg:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#007AFF,#7AA7FF)] text-xl font-bold text-white shadow-[0_20px_45px_-25px_rgba(0,122,255,0.8)]">
            N
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">{copy.cta.eyebrow}</p>
          <h2 className="mt-4 font-['Playfair_Display'] text-4xl tracking-[-0.04em] text-[#132238] sm:text-5xl">{copy.cta.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-8 text-[#5b6f8c]">{copy.cta.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onCreateProfile}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#132238] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1d2d47]"
            >
              {primaryCtaLabel ?? copy.cta.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                if (onSecondaryCta) {
                  onSecondaryCta();
                  return;
                }

                onFindCommunity();
                onOpenAppScreen("people");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8e3f2] bg-white px-6 py-3.5 text-sm font-semibold text-[#21324b] transition-all hover:border-[#bfd5ff]"
            >
              {secondaryCtaLabel ?? copy.cta.secondary}
            </button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-[#6b7f9c]">
            {copy.cta.pills.map((pill) => (
              <span key={pill} className="rounded-full bg-[#eef5ff] px-3 py-1.5">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="rounded-[28px] border border-[#e0e9f6] bg-white/92 p-5 shadow-[0_30px_70px_-55px_rgba(39,71,132,0.2)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#4b74d8]">
                {index === 0 ? (
                  <BriefcaseBusiness className="h-5 w-5" />
                ) : index === 1 ? (
                  <Users className="h-5 w-5" />
                ) : index === 2 ? (
                  <Languages className="h-5 w-5" />
                ) : (
                  <HeartHandshake className="h-5 w-5" />
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#132238]">{service.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#6b7f9c]">{service.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-[#5b6f8c]">{service.detail}</p>
            </article>
          ))}
        </div>

        <footer className="mt-10 rounded-[28px] border border-[#e0e9f6] bg-white/88 px-6 py-8 text-sm leading-7 text-[#6b7f9c] shadow-[0_30px_80px_-55px_rgba(39,71,132,0.22)] sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#007AFF,#7AA7FF)] text-lg font-bold text-white shadow-[0_20px_45px_-25px_rgba(0,122,255,0.85)]">
                  N
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-[-0.04em] text-[#132238]">NeuStart</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[#6d84a5]">
                    {copy.misc.branding}
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#5b6f8c]">
                {copy.misc.footerAbout.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">
                {copy.misc.footerNavTitle}
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-[#4f6684]">
                <button onClick={() => scrollTo("story")} className="text-left transition-colors hover:text-[#132238]">
                  {copy.misc.footerNav[0]}
                </button>
                <button onClick={() => scrollTo("steps")} className="text-left transition-colors hover:text-[#132238]">
                  {copy.misc.footerNav[1]}
                </button>
                <button onClick={() => scrollTo("communities")} className="text-left transition-colors hover:text-[#132238]">
                  {copy.misc.footerNav[2]}
                </button>
                <button
                  onClick={() => {
                    setShowcaseTab("events");
                    scrollTo("inside");
                  }}
                  className="text-left transition-colors hover:text-[#132238]"
                >
                  {copy.misc.footerNav[3]}
                </button>
                <button onClick={() => scrollTo("partners")} className="text-left transition-colors hover:text-[#132238]">
                  {copy.misc.footerNav[4]}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b74d8]">
                {copy.misc.footerDocsTitle}
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-[#4f6684]">
                {copy.misc.footerDocs.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="transition-colors hover:text-[#132238]"
                    onClick={(event) => event.preventDefault()}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#e0e9f6] pt-5 text-sm text-[#6b7f9c] sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-[#4f6684]">© 2026 NeuStart</span>
            <span>{copy.misc.footerCreated}</span>
          </div>
        </footer>
      </section>
    </main>
  );
}

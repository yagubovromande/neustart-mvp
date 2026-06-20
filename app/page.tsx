"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type Dispatch,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import type { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  HeartHandshake,
  Inbox,
  Languages,
  LayoutDashboard,
  LogOut,
  MapPinned,
  SendHorizonal,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  adminMetricsByLocale,
  adminOffersByLocale,
  communityPipelineByLocale,
  eventsByLocale,
  founderChartsByLocale,
  founderFunnelByLocale,
  founderMetricsByLocale,
  moderationQueueByLocale,
  partnersByLocale,
  peopleByLocale,
  profileTags,
  revenueCardsByLocale,
  servicesByLocale,
  translations,
  type AppScreen,
  type Locale,
  type Person,
  type ProductArea,
} from "./i18n";
import { LandingSurface } from "./components/landing-surface";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "../lib/supabase/client";

type IconType = ComponentType<{ className?: string }>;
type ProfileRow = {
  id: string;
  user_id: string;
  name: string;
  city: string;
  languages: string[] | null;
  interests: string[] | null;
  looking_for: string[] | null;
  about: string;
  photo_url: string | null;
  created_at: string;
};

type ProfileFormState = {
  name: string;
  city: string;
  languages: string;
  interests: string;
  lookingFor: string;
  about: string;
  photoUrl: string;
};

type ConnectionRequestStatus = "pending" | "accepted" | "declined";
type ConnectionState = "no_request" | "pending_sent" | "pending_received" | "accepted" | "declined";

type ConnectionRequestRow = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  status: ConnectionRequestStatus;
  created_at: string;
};

type ChatMessageRow = {
  id: string;
  sender_user_id: string;
  recipient_user_id: string;
  message: string;
  created_at: string;
};

type NotificationRow = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  related_user_id: string | null;
  related_chat_user_id: string | null;
  is_read: boolean;
  created_at: string;
};

type ChatThreadSummary = {
  partner: Person;
  lastMessage: string;
  lastActivityAt: string;
  unreadCount: number;
  hasUnread: boolean;
};

type CommunityRow = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  city: string | null;
  language: string | null;
  category: string | null;
  cover_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type CommunityMemberRow = {
  id: string;
  community_id: string;
  user_id: string;
  role: string;
  joined_at: string;
};

type EventRow = {
  id: string;
  community_id: string | null;
  title: string;
  description: string | null;
  city: string | null;
  address: string | null;
  online_url: string | null;
  organizer: string | null;
  starts_at: string;
  ends_at: string | null;
  cover_url: string | null;
  capacity: number | null;
  category: string | null;
  language: string | null;
  visibility: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type EventRsvpRow = {
  id: string;
  event_id: string;
  user_id: string;
  status: string;
  created_at: string;
};

const AVATAR_BUCKET = "profile-photos";

function getConnectionState(
  requests: ConnectionRequestRow[],
  currentUserId: string | undefined,
  targetUserId: string | undefined,
): ConnectionState {
  if (!currentUserId || !targetUserId) {
    return "no_request";
  }

  const relevantRequests = requests.filter(
    (request) =>
      (request.from_user_id === currentUserId && request.to_user_id === targetUserId) ||
      (request.from_user_id === targetUserId && request.to_user_id === currentUserId),
  );

  if (relevantRequests.some((request) => request.status === "accepted")) {
    return "accepted";
  }

  if (
    relevantRequests.some(
      (request) =>
        request.status === "pending" &&
        request.from_user_id === currentUserId &&
        request.to_user_id === targetUserId,
    )
  ) {
    return "pending_sent";
  }

  if (
    relevantRequests.some(
      (request) =>
        request.status === "pending" &&
        request.from_user_id === targetUserId &&
        request.to_user_id === currentUserId,
    )
  ) {
    return "pending_received";
  }

  if (relevantRequests.some((request) => request.status === "declined")) {
    return "declined";
  }

  return "no_request";
}

const emptyProfileForm: ProfileFormState = {
  name: "",
  city: "",
  languages: "",
  interests: "",
  lookingFor: "",
  about: "",
  photoUrl: "",
};

type AppUiCache = {
  locale: Locale;
  remoteProfiles: ProfileRow[];
  profilesLoaded: boolean;
  currentProfile: ProfileRow | null;
  profileLookupComplete: boolean;
  profileForm: ProfileFormState;
  profilePhotoPreview: string;
  connectionRequests: ConnectionRequestRow[];
  requestsLoaded: boolean;
  notifications: NotificationRow[];
  chatThreads: ChatThreadSummary[];
};

const appUiCache: AppUiCache = {
  locale: "ru",
  remoteProfiles: [],
  profilesLoaded: false,
  currentProfile: null,
  profileLookupComplete: false,
  profileForm: emptyProfileForm,
  profilePhotoPreview: "",
  connectionRequests: [],
  requestsLoaded: false,
  notifications: [],
  chatThreads: [],
};

const authStateCache: {
  user: User | null;
  sessionChecked: boolean;
} = {
  user: null,
  sessionChecked: false,
};

function resetAuthenticatedUiCache() {
  appUiCache.currentProfile = null;
  appUiCache.profileLookupComplete = false;
  appUiCache.profilesLoaded = false;
  appUiCache.profileForm = emptyProfileForm;
  appUiCache.profilePhotoPreview = "";
  appUiCache.connectionRequests = [];
  appUiCache.requestsLoaded = false;
  appUiCache.notifications = [];
  appUiCache.chatThreads = [];
}

function resetAuthStateCache() {
  authStateCache.user = null;
  authStateCache.sessionChecked = false;
}

function getRouteState(pathname: string | null): {
  area: ProductArea;
  screen: AppScreen;
} {
  if (pathname === "/auth") {
    return { area: "landing", screen: "home" };
  }

  if (pathname === "/app") {
    return { area: "app", screen: "home" };
  }

  if (pathname === "/profile") {
    return { area: "app", screen: "profile" };
  }

  if (pathname === "/people") {
    return { area: "app", screen: "people" };
  }

  if (pathname === "/communities") {
    return { area: "app", screen: "communities" };
  }

  if (pathname === "/events") {
    return { area: "app", screen: "events" };
  }

  if (pathname === "/contacts") {
    return { area: "app", screen: "contacts" };
  }

  if (pathname === "/requests") {
    return { area: "app", screen: "requests" };
  }

  if (pathname?.startsWith("/chat/")) {
    return { area: "app", screen: "chat" };
  }

  return { area: "landing", screen: "home" };
}

function getRoutePath(screen: AppScreen) {
  if (screen === "home") {
    return "/app";
  }

  if (screen === "profile") {
    return "/profile";
  }

  if (screen === "people") {
    return "/people";
  }

  if (screen === "communities") {
    return "/communities";
  }

  if (screen === "events") {
    return "/events";
  }

  if (screen === "contacts") {
    return "/contacts";
  }

  if (screen === "requests") {
    return "/requests";
  }

  return "/app";
}

const topNavIcons: Record<ProductArea, IconType> = {
  landing: HeartHandshake,
  app: LayoutDashboard,
  founder: TrendingUp,
  admin: ShieldCheck,
};

const mobileNav: Array<{
  screen: AppScreen;
  key: "home" | "people" | "chats" | "events" | "profile";
  icon: IconType;
}> = [
  { screen: "home", key: "home", icon: LayoutDashboard },
  { screen: "people", key: "people", icon: Users },
  { screen: "contacts", key: "chats", icon: Inbox },
  { screen: "events", key: "events", icon: CalendarDays },
  { screen: "profile", key: "profile", icon: UserRound },
];

const serviceIcons: IconType[] = [
  BriefcaseBusiness,
  FileText,
  Languages,
  ShieldCheck,
];

const founderInsightNotes = {
  de: [
    {
      title: "Vertrauen der Gemeinschaft",
      text: "NeuStart wird starker, wenn Entdeckung, Veranstaltungen und Unterstutzung wie eine gemeinsame soziale Reise wirken.",
    },
    {
      title: "Pilot-Hebel",
      text: "Organisationen der Gemeinschaft konnen in einem Pilot zugleich den Nutzerwert und die operative Logik validieren.",
    },
    {
      title: "Monetarisierungsweg",
      text: "Zuerst kommen Partner-Services, spater erweitern Premium-Werkzeuge fur Communities die Erlosstory.",
    },
  ],
  ru: [
    {
      title: "Р”РѕРІРµСЂРёРµ СЃРѕРѕР±С‰РµСЃС‚РІР°",
      text: "NeuStart СЃС‚Р°РЅРѕРІРёС‚СЃСЏ СЃРёР»СЊРЅРµРµ, РєРѕРіРґР° Р·РЅР°РєРѕРјСЃС‚РІР°, СЃРѕР±С‹С‚РёСЏ Рё РїРѕРґРґРµСЂР¶РєР° РѕС‰СѓС‰Р°СЋС‚СЃСЏ РєР°Рє РµРґРёРЅС‹Р№ СЃРѕС†РёР°Р»СЊРЅС‹Р№ РїСѓС‚СЊ.",
    },
    {
      title: "РЎРёР»Р° РїРёР»РѕС‚Р°",
      text: "РџР°СЂС‚РЅРµСЂСЃРєРёРµ СЃРѕРѕР±С‰РµСЃС‚РІР° РјРѕРіСѓС‚ РІ РѕРґРЅРѕРј РїРёР»РѕС‚Рµ РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ РїСЂРѕРІРµСЂРёС‚СЊ Рё С†РµРЅРЅРѕСЃС‚СЊ РґР»СЏ Р»СЋРґРµР№, Рё СЂР°Р±РѕС‡СѓСЋ РѕРїРµСЂР°С†РёРѕРЅРЅСѓСЋ РјРµС…Р°РЅРёРєСѓ.",
    },
    {
      title: "РџСѓС‚СЊ РјРѕРЅРµС‚РёР·Р°С†РёРё",
      text: "РЎРЅР°С‡Р°Р»Р° СЂР°Р±РѕС‚Р°СЋС‚ РїР°СЂС‚РЅРµСЂСЃРєРёРµ СЃРµСЂРІРёСЃС‹, Р° Р·Р°С‚РµРј РёСЃС‚РѕСЂРёСЋ РІС‹СЂСѓС‡РєРё СЂР°СЃС€РёСЂСЏСЋС‚ РїСЂРµРјРёР°Р»СЊРЅС‹Рµ РёРЅСЃС‚СЂСѓРјРµРЅС‚С‹ РґР»СЏ СЃРѕРѕР±С‰РµСЃС‚РІ.",
    },
  ],
} as const satisfies Record<Locale, Array<{ title: string; text: string }>>;

const healthPanelCopy = {
  de: {
    items: [
      { label: "Zustand der Gemeinschaft", value: 82 },
      { label: "Auslastung der Veranstaltungen", value: 74 },
      { label: "Geschwindigkeit der Antworten", value: 68 },
      { label: "Abdeckung der Moderation", value: 91 },
    ],
    pendingReplies: "Offene Antworten von Mitgliedern",
    escalatedOffers: "Eskalierten Angebote",
  },
  ru: {
    items: [
      { label: "РЎРѕСЃС‚РѕСЏРЅРёРµ СЃРѕРѕР±С‰РµСЃС‚РІР°", value: 82 },
      { label: "Р—Р°РїРѕР»РЅСЏРµРјРѕСЃС‚СЊ СЃРѕР±С‹С‚РёР№", value: 74 },
      { label: "РЎРєРѕСЂРѕСЃС‚СЊ РѕС‚РІРµС‚РѕРІ", value: 68 },
      { label: "РџРѕРєСЂС‹С‚РёРµ РјРѕРґРµСЂР°С†РёРё", value: 91 },
    ],
    pendingReplies: "РћР¶РёРґР°СЋС‚ РѕС‚РІРµС‚Р° СѓС‡Р°СЃС‚РЅРёРєРѕРІ",
    escalatedOffers: "Р­СЃРєР°Р»РёСЂРѕРІР°РЅРЅС‹Рµ РѕС„С„РµСЂС‹",
  },
} as const satisfies Record<
  Locale,
  {
    items: Array<{ label: string; value: number }>;
    pendingReplies: string;
    escalatedOffers: string;
  }
>;

const socialCopy = {
  de: {
    authTitle: "Account fur die Plattform",
    authText:
      "Registriere dich oder logge dich ein, um dein Profil zu speichern und in der Community sichtbar zu werden.",
    authStandaloneTitle: "Einloggen oder registrieren",
    login: "Einloggen",
    signup: "Registrieren",
    email: "E-Mail",
    password: "Passwort",
    emailPlaceholder: "du@beispiel.de",
    passwordPlaceholder: "Mindestens 6 Zeichen",
    logout: "Abmelden",
    loggedInAs: "Angemeldet als",
    saveAndPublish: "Profil speichern und veroffentlichen",
    loadingProfiles: "Profile werden geladen...",
    noProfilesTitle: "Noch keine Profile",
    noProfilesText:
      "Sobald die ersten Mitglieder ihr Profil speichern, erscheinen sie hier in der Community.",
    emptyPeopleText:
      "Hier sind noch nicht viele Menschen. Lade die ersten Mitglieder ein, und NeuStart beginnt, sinnvolle Kontakte vorzuschlagen.",
    fallbackTitle: "Demo-Modus",
    fallbackText:
      "Supabase ist noch nicht verbunden. Bis zur Einrichtung werden weiter die vorhandenen Demo-Profile gezeigt.",
    profileSaved: "Profil gespeichert. Du bist jetzt in der Community sichtbar.",
    signupSuccess:
      "Account erstellt. Bitte bestatige deine E-Mail, falls Supabase eine Bestatigung verlangt.",
    loginSuccess: "Erfolgreich eingeloggt.",
    logoutSuccess: "Du wurdest abgemeldet.",
    signupFailed: "Supabase hat keinen neuen Nutzer erstellt. Bitte pruefe Auth-Einstellungen und Schlussel.",
    signupCreatedLoginNow: "Account erstellt. Logge dich jetzt mit dieser E-Mail und deinem Passwort ein.",
    profileLoadError: "Profile konnten gerade nicht geladen werden.",
    profileOwnLoadError: "Dein Profil konnte gerade nicht geladen werden.",
    authRequired: "Bitte logge dich zuerst ein oder erstelle einen Account.",
    profileHelp:
      "Nutze Kommas, um mehrere Sprachen, Interessen oder Suchwunsche einzutragen.",
    languagesPlaceholder: "Zum Beispiel: Russisch, Deutsch",
    interestsPlaceholder: "Zum Beispiel: Familie, Arbeit, Freunde",
    lookingForPlaceholder: "Zum Beispiel: Community, Mentor, Veranstaltungen",
    photoUrlLabel: "Foto-URL",
    photoUrlPlaceholder: "https://...",
    communityMember: "Community-Mitglied",
    freshStart: "Bringt einen frischen Neustart in die Community ein.",
    activeProfile: "Aktives Profil",
    profileNeeded: "Fulle zuerst dein Profil aus, damit dein Bereich freigeschaltet wird.",
    profileStandaloneTitle: "Profil erstellen",
    profileStandaloneText:
      "Nur dein Profil jetzt. Danach geht es direkt in die Community und zu echten Kontakten.",
    appStandaloneTitle: "NeuStart Plattform",
    appStandaloneText:
      "Dein Bereich ist jetzt live. Hier siehst du echte Menschen aus der Community.",
    devDebug: "Entwicklerhinweis",
  },
  ru: {
    authTitle: "РђРєРєР°СѓРЅС‚ РґР»СЏ РїР»Р°С‚С„РѕСЂРјС‹",
    authText:
      "Р—Р°СЂРµРіРёСЃС‚СЂРёСЂСѓР№С‚РµСЃСЊ РёР»Рё РІРѕР№РґРёС‚Рµ, С‡С‚РѕР±С‹ СЃРѕС…СЂР°РЅРёС‚СЊ РїСЂРѕС„РёР»СЊ Рё СЃС‚Р°С‚СЊ РІРёРґРёРјС‹Рј РІРЅСѓС‚СЂРё СЃРѕРѕР±С‰РµСЃС‚РІР°.",
    authStandaloneTitle: "Р’РѕР№С‚Рё РёР»Рё Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ",
    login: "Р’РѕР№С‚Рё",
    signup: "Р РµРіРёСЃС‚СЂР°С†РёСЏ",
    email: "Р­Р». РїРѕС‡С‚Р°",
    password: "РџР°СЂРѕР»СЊ",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "РњРёРЅРёРјСѓРј 6 СЃРёРјРІРѕР»РѕРІ",
    logout: "Р’С‹Р№С‚Рё",
    loggedInAs: "Р’С‹ РІРѕС€Р»Рё РєР°Рє",
    saveAndPublish: "РЎРѕС…СЂР°РЅРёС‚СЊ Рё РѕРїСѓР±Р»РёРєРѕРІР°С‚СЊ РїСЂРѕС„РёР»СЊ",
    loadingProfiles: "РџСЂРѕС„РёР»Рё Р·Р°РіСЂСѓР¶Р°СЋС‚СЃСЏ...",
    noProfilesTitle: "РџРѕРєР° РЅРµС‚ РїСЂРѕС„РёР»РµР№",
    noProfilesText:
      "РљР°Рє С‚РѕР»СЊРєРѕ РїРµСЂРІС‹Рµ СѓС‡Р°СЃС‚РЅРёРєРё СЃРѕС…СЂР°РЅСЏС‚ РїСЂРѕС„РёР»СЊ, РѕРЅРё РїРѕСЏРІСЏС‚СЃСЏ Р·РґРµСЃСЊ РІ СЂР°Р·РґРµР»Рµ СЃРѕРѕР±С‰РµСЃС‚РІР°.",
    emptyPeopleText:
      "РџРѕРєР° Р·РґРµСЃСЊ РјР°Р»Рѕ Р»СЋРґРµР№. РџСЂРёРіР»Р°СЃРёС‚Рµ РїРµСЂРІС‹С… СѓС‡Р°СЃС‚РЅРёРєРѕРІ вЂ” Рё NeuStart РЅР°С‡РЅС‘С‚ РїРѕРґР±РёСЂР°С‚СЊ РїРѕР»РµР·РЅС‹Рµ Р·РЅР°РєРѕРјСЃС‚РІР°.",
    fallbackTitle: "Р”РµРјРѕ-СЂРµР¶РёРј",
    fallbackText:
      "Supabase РїРѕРєР° РЅРµ РїРѕРґРєР»СЋС‡С‘РЅ. Р”Рѕ РЅР°СЃС‚СЂРѕР№РєРё РїСЂРѕРґРѕР»Р¶Р°СЋС‚ РїРѕРєР°Р·С‹РІР°С‚СЊСЃСЏ СЃСѓС‰РµСЃС‚РІСѓСЋС‰РёРµ РґРµРјРѕ-РїСЂРѕС„РёР»Рё.",
    profileSaved: "РџСЂРѕС„РёР»СЊ СЃРѕС…СЂР°РЅС‘РЅ. РўРµРїРµСЂСЊ РІС‹ РІРёРґРЅС‹ РІ СЃРѕРѕР±С‰РµСЃС‚РІРµ.",
    signupSuccess:
      "РђРєРєР°СѓРЅС‚ СЃРѕР·РґР°РЅ. Р•СЃР»Рё РІ Supabase РІРєР»СЋС‡РµРЅРѕ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РїРѕС‡С‚С‹, РїРѕРґС‚РІРµСЂРґРёС‚Рµ Р°РґСЂРµСЃ РёР· РїРёСЃСЊРјР°.",
    loginSuccess: "Р’С…РѕРґ РІС‹РїРѕР»РЅРµРЅ.",
    logoutSuccess: "Р’С‹ РІС‹С€Р»Рё РёР· Р°РєРєР°СѓРЅС‚Р°.",
    signupFailed: "Supabase РЅРµ СЃРѕР·РґР°Р» РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ. РџСЂРѕРІРµСЂСЊС‚Рµ РЅР°СЃС‚СЂРѕР№РєРё Auth Рё РєР»СЋС‡Рё РїСЂРѕРµРєС‚Р°.",
    signupCreatedLoginNow: "РђРєРєР°СѓРЅС‚ СЃРѕР·РґР°РЅ. РўРµРїРµСЂСЊ РІРѕР№РґРёС‚Рµ СЃ СЌС‚РѕР№ РїРѕС‡С‚РѕР№ Рё РїР°СЂРѕР»РµРј.",
    profileLoadError: "РЎРµР№С‡Р°СЃ РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РїСЂРѕС„РёР»Рё.",
    profileOwnLoadError: "РЎРµР№С‡Р°СЃ РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РІР°С€ РїСЂРѕС„РёР»СЊ.",
    authRequired: "РЎРЅР°С‡Р°Р»Р° РІРѕР№РґРёС‚Рµ РёР»Рё Р·Р°СЂРµРіРёСЃС‚СЂРёСЂСѓР№С‚РµСЃСЊ.",
    profileHelp:
      "РСЃРїРѕР»СЊР·СѓР№С‚Рµ Р·Р°РїСЏС‚С‹Рµ, С‡С‚РѕР±С‹ СѓРєР°Р·Р°С‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ СЏР·С‹РєРѕРІ, РёРЅС‚РµСЂРµСЃРѕРІ РёР»Рё Р·Р°РїСЂРѕСЃРѕРІ.",
    languagesPlaceholder: "РќР°РїСЂРёРјРµСЂ: СЂСѓСЃСЃРєРёР№, РЅРµРјРµС†РєРёР№",
    interestsPlaceholder: "РќР°РїСЂРёРјРµСЂ: СЃРµРјСЊСЏ, СЂР°Р±РѕС‚Р°, РґСЂСѓР·СЊСЏ",
    lookingForPlaceholder: "РќР°РїСЂРёРјРµСЂ: СЃРѕРѕР±С‰РµСЃС‚РІРѕ, РЅР°СЃС‚Р°РІРЅРёРє, СЃРѕР±С‹С‚РёСЏ",
    photoUrlLabel: "РЎСЃС‹Р»РєР° РЅР° С„РѕС‚Рѕ",
    photoUrlPlaceholder: "https://...",
    communityMember: "РЈС‡Р°СЃС‚РЅРёРє СЃРѕРѕР±С‰РµСЃС‚РІР°",
    freshStart: "Р”РѕР±Р°РІР»СЏРµС‚ РІ СЃРѕРѕР±С‰РµСЃС‚РІРѕ РЅРѕРІС‹Р№ СЌС‚Р°Рї Р¶РёР·РЅРё Рё СЃРІРµР¶РёР№ РІР·РіР»СЏРґ.",
    activeProfile: "РђРєС‚РёРІРЅС‹Р№ РїСЂРѕС„РёР»СЊ",
    profileNeeded: "РЎРЅР°С‡Р°Р»Р° Р·Р°РїРѕР»РЅРёС‚Рµ РїСЂРѕС„РёР»СЊ, С‡С‚РѕР±С‹ РѕС‚РєСЂС‹С‚СЊ СЃРІРѕР№ СЂР°Р·РґРµР» РїРѕР»РЅРѕСЃС‚СЊСЋ.",
    profileStandaloneTitle: "РЎРѕР·РґР°РЅРёРµ РїСЂРѕС„РёР»СЏ",
    profileStandaloneText:
      "РЎРµР№С‡Р°СЃ С‚РѕР»СЊРєРѕ РїСЂРѕС„РёР»СЊ. РџРѕСЃР»Рµ СЃРѕС…СЂР°РЅРµРЅРёСЏ РІС‹ СЃСЂР°Р·Сѓ РїРµСЂРµР№РґС‘С‚Рµ РІ СЃРѕРѕР±С‰РµСЃС‚РІРѕ Рё СѓРІРёРґРёС‚Рµ СЂРµР°Р»СЊРЅС‹С… Р»СЋРґРµР№.",
    appStandaloneTitle: "РџР»Р°С‚С„РѕСЂРјР° NeuStart",
    appStandaloneText:
      "Р’Р°С€ СЂР°Р·РґРµР» СѓР¶Рµ Р°РєС‚РёРІРµРЅ. Р—РґРµСЃСЊ РїРѕСЏРІР»СЏСЋС‚СЃСЏ СЂРµР°Р»СЊРЅС‹Рµ Р»СЋРґРё РёР· СЃРѕРѕР±С‰РµСЃС‚РІР°.",
    devDebug: "РћС‚Р»Р°РґРєР°",
  },
} as const satisfies Record<
  Locale,
  {
    authTitle: string;
    authText: string;
    login: string;
    signup: string;
    email: string;
    password: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    logout: string;
    loggedInAs: string;
    saveAndPublish: string;
    loadingProfiles: string;
    noProfilesTitle: string;
    noProfilesText: string;
    emptyPeopleText: string;
    fallbackTitle: string;
    fallbackText: string;
    profileSaved: string;
    signupSuccess: string;
    loginSuccess: string;
    logoutSuccess: string;
    signupFailed: string;
    signupCreatedLoginNow: string;
    profileLoadError: string;
    profileOwnLoadError: string;
    authRequired: string;
    profileHelp: string;
    languagesPlaceholder: string;
    interestsPlaceholder: string;
    lookingForPlaceholder: string;
    photoUrlLabel: string;
    photoUrlPlaceholder: string;
    communityMember: string;
    freshStart: string;
    activeProfile: string;
    profileNeeded: string;
    authStandaloneTitle: string;
    profileStandaloneTitle: string;
    profileStandaloneText: string;
    appStandaloneTitle: string;
    appStandaloneText: string;
    devDebug: string;
  }
>;

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();
  const [clientPathname, setClientPathname] = useState(pathname ?? "/");
  const initialRoute = getRouteState(clientPathname);
  const routeState = getRouteState(clientPathname);
  const isAuthRoute = clientPathname === "/auth";
  const isProfileRoute = clientPathname === "/profile";
  const isPeopleRoute = clientPathname === "/people";
  const isCommunitiesRoute = clientPathname === "/communities";
  const isEventsRoute = clientPathname === "/events";
  const isContactsRoute = clientPathname === "/contacts";
  const isRequestsRoute = clientPathname === "/requests";
  const chatRouteUserId =
    clientPathname.startsWith("/chat/") ? decodeURIComponent(clientPathname.split("/")[2] ?? "") : null;
  const isChatRoute = Boolean(chatRouteUserId);
  const isAppRoute = clientPathname === "/app";
  const isStandaloneUserRoute =
    isAuthRoute ||
    isProfileRoute ||
    isPeopleRoute ||
    isCommunitiesRoute ||
    isEventsRoute ||
    isContactsRoute ||
    isRequestsRoute ||
    isChatRoute ||
    isAppRoute;
  const [locale, setLocale] = useState<Locale>(appUiCache.locale);
  const [area, setArea] = useState<ProductArea>(initialRoute.area);
  const [appScreen, setAppScreen] = useState<AppScreen>(initialRoute.screen);
  const [pendingStandaloneScreen, setPendingStandaloneScreen] = useState<AppScreen | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState(1);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventFeedTab, setEventFeedTab] = useState<"upcoming" | "mine">("upcoming");
  const [personDetailOpen, setPersonDetailOpen] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestRow[]>(
    appUiCache.connectionRequests,
  );
  const [requestsLoaded, setRequestsLoaded] = useState(appUiCache.requestsLoaded);
  const [requestsLoading, setRequestsLoading] = useState(isSupabaseConfigured && !appUiCache.requestsLoaded);
  const [requestsMessage, setRequestsMessage] = useState<string | null>(null);
  const [requestModalPerson, setRequestModalPerson] = useState<Person | null>(null);
  const [requestDraft, setRequestDraft] = useState("");
  const [requestSending, setRequestSending] = useState(false);
  const [requestModalMode, setRequestModalMode] = useState<"compose" | "success">("compose");
  const [chatMessages, setChatMessages] = useState<ChatMessageRow[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatFeedback, setChatFeedback] = useState<string | null>(null);
  const [chatThreads, setChatThreads] = useState<ChatThreadSummary[]>(appUiCache.chatThreads);
  const [chatsLoading, setChatsLoading] = useState(
    isSupabaseConfigured && appUiCache.chatThreads.length === 0,
  );
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const pendingStandalonePathRef = useRef<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(authStateCache.user);
  const [authSessionLoading, setAuthSessionLoading] = useState(
    isSupabaseConfigured && !authStateCache.sessionChecked,
  );
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [profilesLoaded, setProfilesLoaded] = useState(appUiCache.profilesLoaded);
  const [profilesLoading, setProfilesLoading] = useState(isSupabaseConfigured && !appUiCache.profilesLoaded);
  const [profilesMessage, setProfilesMessage] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [remoteProfiles, setRemoteProfiles] = useState<ProfileRow[]>(appUiCache.remoteProfiles);
  const [currentProfile, setCurrentProfile] = useState<ProfileRow | null>(appUiCache.currentProfile);
  const [profileLookupComplete, setProfileLookupComplete] = useState(appUiCache.profileLookupComplete);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(appUiCache.profileForm);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(appUiCache.profilePhotoPreview);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationRow[]>(appUiCache.notifications);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [communitiesLoading, setCommunitiesLoading] = useState(false);
  const [communitiesMessage, setCommunitiesMessage] = useState<string | null>(null);
  const [communityRows, setCommunityRows] = useState<CommunityRow[]>([]);
  const [communityMemberRows, setCommunityMemberRows] = useState<CommunityMemberRow[]>([]);
  const [communityMembersLoading, setCommunityMembersLoading] = useState(false);
  const [communityActionLoadingId, setCommunityActionLoadingId] = useState<string | null>(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsMessage, setEventsMessage] = useState<string | null>(null);
  const [eventRows, setEventRows] = useState<EventRow[]>([]);
  const [eventRsvpRows, setEventRsvpRows] = useState<EventRsvpRow[]>([]);
  const [eventRsvpsLoading, setEventRsvpsLoading] = useState(false);
  const [eventActionLoadingId, setEventActionLoadingId] = useState<string | null>(null);

  const t = translations[locale];
  const social = socialCopy[locale];
  const fallbackPeople = peopleByLocale[locale];
  const fallbackContactPeople = fallbackPeople.slice(0, 2);
  const activeRemoteProfiles = remoteProfiles.filter(isActiveProfile);
  const publicPeople = isSupabaseConfigured
    ? activeRemoteProfiles.map((profile, index) => mapProfileToPerson(profile, locale, index))
    : fallbackPeople;
  const appPeople = isSupabaseConfigured
    ? activeRemoteProfiles
        .filter((profile) => profile.user_id !== authUser?.id)
        .map((profile, index) => mapProfileToPerson(profile, locale, index))
    : fallbackPeople;
  const events = eventsByLocale[locale];
  const services = servicesByLocale[locale];
  const partners = partnersByLocale[locale];
  const founderMetrics = founderMetricsByLocale[locale];
  const founderFunnel = founderFunnelByLocale[locale];
  const founderCharts = founderChartsByLocale[locale];
  const communityPipeline = communityPipelineByLocale[locale];
  const revenueCards = revenueCardsByLocale[locale];
  const adminMetrics = adminMetricsByLocale[locale];
  const adminOffers = adminOffersByLocale[locale];
  const moderationQueue = moderationQueueByLocale[locale];
  const selectedPerson =
    appPeople.find((person) => person.id === selectedPersonId) ?? appPeople[0];
  const incomingRequests = connectionRequests.filter(
    (request) => request.to_user_id === authUser?.id && request.status === "pending",
  );
  const acceptedContactUserIds = Array.from(
    new Set(
      connectionRequests
        .filter(
          (request) =>
            request.status === "accepted" &&
            (request.from_user_id === authUser?.id || request.to_user_id === authUser?.id),
        )
        .map((request) =>
          request.from_user_id === authUser?.id ? request.to_user_id : request.from_user_id,
        ),
    ),
  );
  const contactPeople =
    isSupabaseConfigured && authUser
      ? publicPeople.filter((person) => person.userId && acceptedContactUserIds.includes(person.userId))
      : fallbackContactPeople;
  const requestPeople = publicPeople.filter((person) => person.userId);
  const chatPartner =
    (chatRouteUserId
      ? requestPeople.find(
          (person) => person.userId === chatRouteUserId || String(person.id) === chatRouteUserId,
        )
      : undefined) ?? selectedPerson;
  const hasCompletedProfile = Boolean(currentProfile?.name?.trim() && currentProfile?.city?.trim());
  const selectedCommunity = communityRows.find((community) => community.id === selectedCommunityId) ?? null;
  const selectedEvent = eventRows.find((event) => event.id === selectedEventId) ?? null;
  const unreadChatNotifications = notifications.filter(
    (item) => item.type === "chat_message" && !item.is_read,
  );
  const unreadChatCount = unreadChatNotifications.length;
  const landingPrimaryCtaLabel = authUser
    ? hasCompletedProfile
      ? locale === "ru"
        ? "РћС‚РєСЂС‹С‚СЊ РїСЂРёР»РѕР¶РµРЅРёРµ"
        : "App Г¶ffnen"
      : locale === "ru"
        ? "Р—Р°РІРµСЂС€РёС‚СЊ РїСЂРѕС„РёР»СЊ"
        : "Profil vervollstГ¤ndigen"
    : undefined;
  const landingSecondaryCtaLabel =
    authUser && hasCompletedProfile
      ? locale === "ru"
        ? "Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РїСЂРѕС„РёР»СЊ"
        : "Profil bearbeiten"
      : undefined;

  const shellSubtitle =
    locale === "ru"
      ? "РџР›РђРўР¤РћР РњРђ Р”Р›РЇ РќРћР’РћР™ Р–РР—РќР Р’ Р“Р•Р РњРђРќРР"
      : "PLATTFORM FUR EINEN NEUANFANG IN DEUTSCHLAND";
  function setFriendlyMessage(
    setter: Dispatch<SetStateAction<string | null>>,
    fallbackRu: string,
    fallbackDe: string,
    error?: unknown,
  ) {
    if (error) {
      console.error(error);
    }

    setter(locale === "ru" ? fallbackRu : fallbackDe);
  }

  function warnInDevelopment(message: string, error?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(message, error);
    }
  }

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      setClientPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    appUiCache.locale = locale;
    appUiCache.remoteProfiles = remoteProfiles;
    appUiCache.profilesLoaded = profilesLoaded;
    appUiCache.currentProfile = currentProfile;
    appUiCache.profileLookupComplete = profileLookupComplete;
    appUiCache.profileForm = profileForm;
    appUiCache.profilePhotoPreview = profilePhotoPreview;
    appUiCache.connectionRequests = connectionRequests;
    appUiCache.requestsLoaded = requestsLoaded;
    appUiCache.notifications = notifications;
    appUiCache.chatThreads = chatThreads;
  }, [
    chatThreads,
    connectionRequests,
    currentProfile,
    locale,
    notifications,
    profileForm,
    profileLookupComplete,
    profilePhotoPreview,
    profilesLoaded,
    remoteProfiles,
    requestsLoaded,
  ]);

  useEffect(() => {
    authStateCache.user = authUser;
    authStateCache.sessionChecked = !authSessionLoading;
  }, [authSessionLoading, authUser]);

  useEffect(() => {
    if (!pendingStandalonePathRef.current) {
      return;
    }

    if (clientPathname === pendingStandalonePathRef.current) {
      pendingStandalonePathRef.current = null;
      setPendingStandaloneScreen(null);
    }
  }, [clientPathname]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    let isActive = true;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isActive) {
        return;
      }

      if (error) {
        setFriendlyMessage(
          setAuthMessage,
          "РќРµ СѓРґР°Р»РѕСЃСЊ РїСЂРѕРІРµСЂРёС‚СЊ РІС…РѕРґ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РєСЂС‹С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ РµС‰С‘ СЂР°Р·.",
          "Die Anmeldung konnte nicht geprГјft werden. Bitte Г¶ffne die Seite erneut.",
          error,
        );
        authStateCache.sessionChecked = true;
        setAuthSessionLoading(false);
        return;
      }

      const nextUser = data.session?.user ?? null;
      authStateCache.user = nextUser;
      authStateCache.sessionChecked = true;
      setAuthUser(nextUser);
      setAuthSessionLoading(false);

      if (!nextUser) {
        resetAuthStateCache();
        resetAuthenticatedUiCache();
        setCurrentProfile(null);
        setProfileLookupComplete(false);
        setProfileForm(emptyProfileForm);
        setProfilePhotoPreview("");
        setConnectionRequests([]);
        setNotifications([]);
        setChatThreads([]);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) {
        return;
      }

      const nextUser = session?.user ?? null;
      authStateCache.user = nextUser;
      authStateCache.sessionChecked = true;
      setAuthUser(nextUser);
      setAuthSessionLoading(false);

      if (!nextUser) {
        resetAuthStateCache();
        resetAuthenticatedUiCache();
        setCurrentProfile(null);
        setProfileLookupComplete(false);
        setProfileForm(emptyProfileForm);
        setProfilePhotoPreview("");
        setConnectionRequests([]);
        setNotifications([]);
        setChatThreads([]);
      }
    });

    return () => {
      isActive = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    void loadProfiles();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || authSessionLoading) {
      return;
    }

    if (!authUser) {
      if (
        isProfileRoute ||
        isPeopleRoute ||
        isCommunitiesRoute ||
        isEventsRoute ||
        isContactsRoute ||
        isRequestsRoute ||
        isChatRoute ||
        isAppRoute
      ) {
        replaceClientPath("/auth");
      }
    }
  }, [
    authSessionLoading,
    authUser,
    isAppRoute,
    isChatRoute,
    isCommunitiesRoute,
    isContactsRoute,
    isEventsRoute,
    isPeopleRoute,
    isProfileRoute,
    isRequestsRoute,
  ]);

  useEffect(() => {
    if (!isSupabaseConfigured || authSessionLoading || !authUser?.id) {
      return;
    }

    void loadOwnProfile(authUser.id);
  }, [authSessionLoading, authUser?.id]);

  useEffect(() => {
    if (!isSupabaseConfigured || authSessionLoading || !authUser) {
      return;
    }

    if (isAppRoute && profileLookupComplete && !currentProfile) {
      replaceClientPath("/profile");
    }
  }, [authSessionLoading, authUser, currentProfile, isAppRoute, profileLookupComplete]);

  useEffect(() => {
    if (!isSupabaseConfigured || !authUser) {
      return;
    }

    void loadConnectionRequests(authUser.id);
    void loadNotifications(authUser.id);
    void loadChatThreads(authUser.id);
    void loadCommunities();
    void loadCommunityMembers();
    void loadEvents();
    void loadEventRsvps();
  }, [authUser]);

  useEffect(() => {
    if (!isSupabaseConfigured || !authUser || !chatRouteUserId) {
      return;
    }

    void loadChatMessagesFor(authUser.id, chatRouteUserId);
    void markChatNotificationsRead(authUser.id, chatRouteUserId);
  }, [authUser, chatRouteUserId]);

  useEffect(() => {
    if (!isSupabaseConfigured || !authUser) {
      return;
    }

    void loadChatThreads(authUser.id);
  }, [authUser?.id, connectionRequests, remoteProfiles, locale]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function replaceClientPath(nextPath: string) {
    if (typeof window === "undefined") {
      router.replace(nextPath);
      return;
    }

    if (window.location.pathname !== nextPath) {
      window.history.replaceState(window.history.state, "", nextPath);
    }

    setClientPathname(nextPath);
  }

  function openApp(screen: AppScreen) {
    const nextPath = getRoutePath(screen);
    pendingStandalonePathRef.current = nextPath;
    setPendingStandaloneScreen(screen);
    setArea("app");
    setAppScreen(screen);
    setPersonDetailOpen(false);
    replaceClientPath(nextPath);
  }

  function openAuth() {
    pendingStandalonePathRef.current = "/auth";
    setPendingStandaloneScreen(null);
    setArea("landing");
    replaceClientPath("/auth");
  }

  function openArea(nextArea: ProductArea) {
    setArea(nextArea);
    setPersonDetailOpen(false);

    if (nextArea === "landing") {
      pendingStandalonePathRef.current = "/";
      setPendingStandaloneScreen(null);
      replaceClientPath("/");
      return;
    }

    if (nextArea === "app") {
      pendingStandalonePathRef.current = "/app";
      setPendingStandaloneScreen("home");
      replaceClientPath("/app");
    }
  }

  function buildProfilePayload(photoUrlOverride?: string) {
    if (!authUser) {
      return null;
    }

    return {
      user_id: authUser.id,
      name: profileForm.name.trim(),
      city: profileForm.city.trim(),
      languages: splitList(profileForm.languages),
      interests: splitList(profileForm.interests),
      looking_for: splitList(profileForm.lookingFor),
      about: profileForm.about.trim(),
      photo_url: (photoUrlOverride ?? profileForm.photoUrl).trim() || null,
    };
  }

  async function loadProfiles() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setProfilesLoading(true);
    setProfilesMessage(null);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      warnInDevelopment("Profiles could not be loaded.", error);
      setFriendlyMessage(
        setProfilesMessage,
        "РЎРїРёСЃРѕРє Р»СЋРґРµР№ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р· С‡СѓС‚СЊ РїРѕР·Р¶Рµ.",
        "Die Menschenliste ist gerade nicht verfГјgbar. Bitte versuche es gleich noch einmal.",
        error,
      );
      setProfilesLoaded(true);
      setProfilesLoading(false);
      return;
    }

    setRemoteProfiles((data ?? []) as ProfileRow[]);
    setProfilesLoaded(true);
    setProfilesLoading(false);
  }

  async function loadOwnProfile(userId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return null;
    }

    setProfileLookupComplete(false);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      setFriendlyMessage(
        setProfileMessage,
        "Р’Р°С€ РїСЂРѕС„РёР»СЊ СЃРµР№С‡Р°СЃ РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ.",
        "Dein Profil konnte gerade nicht geladen werden.",
        error,
      );
      setProfileLookupComplete(true);
      return null;
    }

    if (data) {
      const profile = data as ProfileRow;
      setCurrentProfile(profile);
      setProfileLookupComplete(true);
      setProfileForm(mapProfileToForm(profile));
      setProfilePhotoPreview(profile.photo_url ?? "");
      return profile;
    }

    setCurrentProfile(null);
    setProfileForm(emptyProfileForm);
    setProfilePhotoPreview("");
    setProfileLookupComplete(true);
    return null;
  }

  async function loadConnectionRequests(userId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setRequestsLoading(true);
    setRequestsMessage(null);

    const { data, error } = await supabase
      .from("connection_requests")
      .select("*")
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      setFriendlyMessage(
        setRequestsMessage,
        "Р—Р°РїСЂРѕСЃС‹ СЃРµР№С‡Р°СЃ РЅРµРґРѕСЃС‚СѓРїРЅС‹. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕР±РЅРѕРІРёС‚СЊ СЃС‚СЂР°РЅРёС†Сѓ С‡СѓС‚СЊ РїРѕР·Р¶Рµ.",
        "Anfragen sind gerade nicht verfГјgbar. Bitte versuche es gleich noch einmal.",
        error,
      );
      setRequestsLoaded(true);
      setRequestsLoading(false);
      return;
    }

    setConnectionRequests((data as ConnectionRequestRow[]) ?? []);
    setRequestsLoaded(true);
    setRequestsLoading(false);
  }

  async function loadCommunities() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setCommunitiesLoading(false);
      return;
    }

    setCommunitiesLoading(true);
    setCommunitiesMessage(null);

    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setFriendlyMessage(
        setCommunitiesMessage,
        "РЎРѕРѕР±С‰РµСЃС‚РІР° СЃРµР№С‡Р°СЃ РЅРµРґРѕСЃС‚СѓРїРЅС‹. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РєСЂС‹С‚СЊ СЂР°Р·РґРµР» С‡СѓС‚СЊ РїРѕР·Р¶Рµ.",
        "Communities sind gerade nicht verfГјgbar. Bitte Г¶ffne den Bereich spГ¤ter erneut.",
        error,
      );
      setCommunitiesLoading(false);
      return;
    }

    setCommunityRows((data as CommunityRow[]) ?? []);
    setCommunitiesLoading(false);
  }

  async function loadCommunityMembers() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setCommunityMembersLoading(false);
      return;
    }

    setCommunityMembersLoading(true);

    const { data, error } = await supabase
      .from("community_members")
      .select("*")
      .order("joined_at", { ascending: false });

    if (error) {
      warnInDevelopment("Community memberships are unavailable.", error);
      setCommunityMembersLoading(false);
      return;
    }

    setCommunityMemberRows((data as CommunityMemberRow[]) ?? []);
    setCommunityMembersLoading(false);
  }

  async function loadEvents() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setEventsLoading(false);
      return;
    }

    setEventsLoading(true);
    setEventsMessage(null);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("visibility", "public")
      .order("starts_at", { ascending: true });

    if (error) {
      setFriendlyMessage(
        setEventsMessage,
        "РЎРїРёСЃРѕРє СЃРѕР±С‹С‚РёР№ СЃРµР№С‡Р°СЃ РЅРµРґРѕСЃС‚СѓРїРµРЅ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РєСЂС‹С‚СЊ СЂР°Р·РґРµР» С‡СѓС‚СЊ РїРѕР·Р¶Рµ.",
        "Die Eventliste ist gerade nicht verfГјgbar. Bitte Г¶ffne den Bereich spГ¤ter erneut.",
        error,
      );
      setEventsLoading(false);
      return;
    }

    setEventRows((data as EventRow[]) ?? []);
    setEventsLoading(false);
  }

  async function loadEventRsvps() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setEventRsvpsLoading(false);
      return;
    }

    setEventRsvpsLoading(true);

    const { data, error } = await supabase
      .from("event_rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      warnInDevelopment("Event RSVPs are unavailable.", error);
      setEventRsvpsLoading(false);
      return;
    }

    setEventRsvpRows((data as EventRsvpRow[]) ?? []);
    setEventRsvpsLoading(false);
  }

  async function loadNotifications(userId: string) {
    try {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        if (isMountedRef.current) {
          setNotifications([]);
          setNotificationsLoading(false);
        }
        return;
      }

      if (isMountedRef.current) {
        setNotificationsLoading(true);
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!isMountedRef.current) {
        return;
      }

      if (error) {
        warnInDevelopment("Notifications are unavailable.", error);
        setNotifications([]);
        void loadChatThreads(userId, []);
        return;
      }

      const nextNotifications = (data as NotificationRow[]) ?? [];
      setNotifications(nextNotifications);
      void loadChatThreads(userId, nextNotifications);
    } catch (error) {
      if (isMountedRef.current) {
        warnInDevelopment("Notifications failed to load.", error);
        setNotifications([]);
        void loadChatThreads(userId, []);
      }
    } finally {
      if (isMountedRef.current) {
        setNotificationsLoading(false);
      }
    }
  }

  async function loadChatThreads(userId: string, notificationRows?: NotificationRow[]) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      if (isMountedRef.current) {
        setChatThreads([]);
        setChatsLoading(false);
      }
      return;
    }

    if (isMountedRef.current) {
      setChatsLoading(true);
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, sender_user_id, recipient_user_id, message, created_at")
      .or(`sender_user_id.eq.${userId},recipient_user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (!isMountedRef.current) {
      return;
    }

    if (error) {
      console.error(error);
      setChatsLoading(false);
      return;
    }

    const rows = (data as ChatMessageRow[]) ?? [];
    const acceptedByUserId = new Map(contactPeople.map((person) => [person.userId, person] as const));
    const summaries: ChatThreadSummary[] = contactPeople
      .map((person) => {
        const partnerUserId = person.userId;

        if (!partnerUserId) {
          return null;
        }

        const partnerMessages = rows.filter(
          (item) =>
            (item.sender_user_id === userId && item.recipient_user_id === partnerUserId) ||
            (item.sender_user_id === partnerUserId && item.recipient_user_id === userId),
        );
        const latestMessage = partnerMessages[0];
        const unreadNotifications = (notificationRows ?? unreadChatNotifications).filter(
          (item) => !item.is_read,
        );
        const unreadCount = unreadNotifications.filter(
          (item) => item.related_chat_user_id === partnerUserId,
        ).length;
        const acceptedRequest = connectionRequests.find(
          (item) =>
            item.status === "accepted" &&
            ((item.from_user_id === userId && item.to_user_id === partnerUserId) ||
              (item.from_user_id === partnerUserId && item.to_user_id === userId)),
        );

        return {
          partner: acceptedByUserId.get(partnerUserId) ?? person,
          lastMessage:
            latestMessage?.message ??
            (locale === "ru"
              ? "Р§Р°С‚ РіРѕС‚РѕРІ Рє РїРµСЂРІРѕРјСѓ СЃРѕРѕР±С‰РµРЅРёСЋ."
              : "Der Chat ist bereit fГјr die erste Nachricht."),
          lastActivityAt: latestMessage?.created_at ?? acceptedRequest?.created_at ?? new Date(0).toISOString(),
          unreadCount,
          hasUnread: unreadCount > 0,
        } satisfies ChatThreadSummary;
      })
      .filter(Boolean)
      .sort((left, right) => new Date(right!.lastActivityAt).getTime() - new Date(left!.lastActivityAt).getTime()) as ChatThreadSummary[];

    setChatThreads(summaries);
    setChatsLoading(false);
  }

  async function loadChatMessagesFor(userId: string, partnerUserId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setChatLoading(true);
    setChatFeedback(null);

    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, sender_user_id, recipient_user_id, message, created_at")
      .or(
        `and(sender_user_id.eq.${userId},recipient_user_id.eq.${partnerUserId}),and(sender_user_id.eq.${partnerUserId},recipient_user_id.eq.${userId})`,
      )
      .order("created_at", { ascending: true });

    if (error) {
      setFriendlyMessage(
        setChatFeedback,
        "РџРµСЂРµРїРёСЃРєР° СЃРµР№С‡Р°СЃ РЅРµРґРѕСЃС‚СѓРїРЅР°. РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕС‚РєСЂС‹С‚СЊ С‡Р°С‚ РµС‰С‘ СЂР°Р·.",
        "Der Chat ist gerade nicht verfГјgbar. Bitte Г¶ffne ihn erneut.",
        error,
      );
      setChatLoading(false);
      return;
    }

    setChatMessages((data as ChatMessageRow[]) ?? []);
    setChatLoading(false);
  }

  async function markChatNotificationsRead(userId: string, partnerUserId: string) {
    try {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        return;
      }

      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("type", "chat_message")
        .eq("related_chat_user_id", partnerUserId)
        .eq("is_read", false);

      if (error) {
        warnInDevelopment("Chat notifications could not be marked as read.", error);
        return;
      }

      await loadNotifications(userId);
      await loadChatThreads(userId);
    } catch (error) {
      warnInDevelopment("markChatNotificationsRead failed.", error);
    }
  }

  async function joinCommunity(communityId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      setCommunitiesMessage(social.authRequired);
      return;
    }

    setCommunityActionLoadingId(communityId);
    setCommunitiesMessage(null);

    const { error } = await supabase.from("community_members").insert({
      community_id: communityId,
      user_id: authUser.id,
      role: "member",
    });

    if (error) {
      setFriendlyMessage(
        setCommunitiesMessage,
        "РќРµ СѓРґР°Р»РѕСЃСЊ РІСЃС‚СѓРїРёС‚СЊ РІ СЃРѕРѕР±С‰РµСЃС‚РІРѕ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.",
        "Der Beitritt zur Community ist fehlgeschlagen. Bitte versuche es erneut.",
        error,
      );
      setCommunityActionLoadingId(null);
      return;
    }

    await loadCommunityMembers();
    setCommunitiesMessage(
      locale === "ru" ? "Р’С‹ РїСЂРёСЃРѕРµРґРёРЅРёР»РёСЃСЊ Рє СЃРѕРѕР±С‰РµСЃС‚РІСѓ." : "Du bist der Community beigetreten.",
    );
    setCommunityActionLoadingId(null);
  }

  async function leaveCommunity(communityId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      setCommunitiesMessage(social.authRequired);
      return;
    }

    setCommunityActionLoadingId(communityId);
    setCommunitiesMessage(null);

    const { error } = await supabase
      .from("community_members")
      .delete()
      .eq("community_id", communityId)
      .eq("user_id", authUser.id);

    if (error) {
      setFriendlyMessage(
        setCommunitiesMessage,
        "РќРµ СѓРґР°Р»РѕСЃСЊ РІС‹Р№С‚Рё РёР· СЃРѕРѕР±С‰РµСЃС‚РІР°. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.",
        "Das Verlassen der Community ist fehlgeschlagen. Bitte versuche es erneut.",
        error,
      );
      setCommunityActionLoadingId(null);
      return;
    }

    await loadCommunityMembers();
    setCommunitiesMessage(
      locale === "ru" ? "Р’С‹ РІС‹С€Р»Рё РёР· СЃРѕРѕР±С‰РµСЃС‚РІР°." : "Du hast die Community verlassen.",
    );
    setCommunityActionLoadingId(null);
  }

  async function saveRsvpNotification(eventRow: EventRow) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      return;
    }

    const { error } = await supabase.from("notifications").insert({
      user_id: authUser.id,
      type: "rsvp_confirmed",
      title: locale === "ru" ? "Р’С‹ Р·Р°РїРёСЃР°Р»РёСЃСЊ РЅР° СЃРѕР±С‹С‚РёРµ" : "Du bist fГјr ein Event angemeldet",
      body: eventRow.title,
      related_user_id: null,
      related_chat_user_id: null,
      is_read: false,
    });

    if (error) {
      warnInDevelopment("RSVP notification could not be saved.", error);
    }
  }

  async function rsvpEvent(eventId: string) {
    const supabase = getSupabaseBrowserClient();
    const eventRow = eventRows.find((item) => item.id === eventId);

    if (!supabase || !authUser || !eventRow) {
      setEventsMessage(social.authRequired);
      return;
    }

    setEventActionLoadingId(eventId);
    setEventsMessage(null);

    const { error } = await supabase.from("event_rsvps").upsert(
      {
        event_id: eventId,
        user_id: authUser.id,
        status: "going",
      },
      { onConflict: "event_id,user_id" },
    );

    if (error) {
      setFriendlyMessage(
        setEventsMessage,
        "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° СЃРѕР±С‹С‚РёРµ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.",
        "Die Event-Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.",
        error,
      );
      setEventActionLoadingId(null);
      return;
    }

    await saveRsvpNotification(eventRow);
    await loadEventRsvps();
    await loadNotifications(authUser.id);
    setEventsMessage(locale === "ru" ? "Р’С‹ Р·Р°РїРёСЃР°Р»РёСЃСЊ РЅР° СЃРѕР±С‹С‚РёРµ." : "Du bist fГјr das Event angemeldet.");
    setEventActionLoadingId(null);
  }

  async function cancelRsvp(eventId: string) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      setEventsMessage(social.authRequired);
      return;
    }

    setEventActionLoadingId(eventId);
    setEventsMessage(null);

    const { error } = await supabase
      .from("event_rsvps")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", authUser.id);

    if (error) {
      setFriendlyMessage(
        setEventsMessage,
        "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РјРµРЅРёС‚СЊ Р·Р°РїРёСЃСЊ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.",
        "Die Anmeldung konnte nicht storniert werden. Bitte versuche es erneut.",
        error,
      );
      setEventActionLoadingId(null);
      return;
    }

    await loadEventRsvps();
    setEventsMessage(locale === "ru" ? "Р—Р°РїРёСЃСЊ РЅР° СЃРѕР±С‹С‚РёРµ РѕС‚РјРµРЅРµРЅР°." : "Die Event-Anmeldung wurde storniert.");
    setEventActionLoadingId(null);
  }

  function openRequests() {
    pendingStandalonePathRef.current = "/requests";
    setPendingStandaloneScreen("requests");
    setArea("app");
    setAppScreen("requests");
    setPersonDetailOpen(false);
    replaceClientPath("/requests");
  }

  function openChat(partnerUserId: string) {
    const nextPath = `/chat/${encodeURIComponent(partnerUserId)}`;
    pendingStandalonePathRef.current = nextPath;
    setPendingStandaloneScreen("chat");
    setArea("app");
    setAppScreen("chat");
    setPersonDetailOpen(false);
    replaceClientPath(nextPath);
  }

  function openConnectionRequest(person: Person) {
    setRequestModalPerson(person);
    setRequestDraft("");
    setRequestModalMode("compose");
    setRequestsMessage(null);
  }

  function closeConnectionRequest() {
    setRequestModalPerson(null);
    setRequestDraft("");
    setRequestModalMode("compose");
    setRequestsMessage(null);
  }

  async function sendConnectionRequest() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser || !requestModalPerson?.userId) {
      setRequestsMessage(social.authRequired);
      return;
    }

    const existingState = getConnectionState(
      connectionRequests,
      authUser.id,
      requestModalPerson.userId,
    );

    if (existingState !== "no_request") {
      setRequestsMessage(
        existingState === "accepted"
          ? locale === "ru"
            ? "Р—РЅР°РєРѕРјСЃС‚РІРѕ СѓР¶Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅРѕ."
            : "Die Verbindung ist bereits bestГ¤tigt."
          : existingState === "pending_received"
            ? locale === "ru"
              ? "РЈ РІР°СЃ СѓР¶Рµ РµСЃС‚СЊ РІС…РѕРґСЏС‰РёР№ Р·Р°РїСЂРѕСЃ."
              : "Es gibt bereits eine eingehende Anfrage."
            : existingState === "declined"
              ? locale === "ru"
                ? "Р—Р°РїСЂРѕСЃ СѓР¶Рµ Р±С‹Р» РѕС‚РєР»РѕРЅС‘РЅ."
                : "Die Anfrage wurde bereits abgelehnt."
              : locale === "ru"
                ? "Р—Р°РїСЂРѕСЃ СѓР¶Рµ СЃСѓС‰РµСЃС‚РІСѓРµС‚."
                : "Die Anfrage existiert bereits.",
      );
      return;
    }

    setRequestSending(true);
    setRequestsMessage(null);

    const { error } = await supabase.from("connection_requests").insert({
      from_user_id: authUser.id,
      to_user_id: requestModalPerson.userId,
      message: requestDraft.trim(),
      status: "pending",
    });

    if (error) {
      console.error(error);
      setRequestsMessage(
        error.message.includes("connection_requests_from_user_id_to_user_id_key")
          ? locale === "ru"
            ? "Р—Р°РїСЂРѕСЃ СѓР¶Рµ СЃСѓС‰РµСЃС‚РІСѓРµС‚."
            : "Die Anfrage existiert bereits."
          : locale === "ru"
            ? "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·."
            : "Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.",
      );
      setRequestSending(false);
      return;
    }

    setRequestSending(false);
    setRequestModalMode("success");
    setRequestsMessage(locale === "ru" ? "Р—Р°РїСЂРѕСЃ РѕС‚РїСЂР°РІР»РµРЅ." : "Anfrage gesendet.");
    await loadConnectionRequests(authUser.id);
  }

  async function updateConnectionRequestStatus(
    requestId: string,
    status: Extract<ConnectionRequestStatus, "accepted" | "declined">,
  ) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      return;
    }

    setRequestsMessage(null);

    const { error } = await supabase
      .from("connection_requests")
      .update({ status })
      .eq("id", requestId)
      .eq("to_user_id", authUser.id);

    if (error) {
      console.error(error);
      setRequestsMessage(
        locale === "ru"
          ? "РќРµ СѓРґР°Р»РѕСЃСЊ РѕР±РЅРѕРІРёС‚СЊ Р·Р°РїСЂРѕСЃ."
          : "Die Anfrage konnte nicht aktualisiert werden.",
      );
      return;
    }

    setRequestsMessage(
      status === "accepted"
        ? locale === "ru"
          ? "Р—Р°РїСЂРѕСЃ РїСЂРёРЅСЏС‚."
          : "Anfrage angenommen."
        : locale === "ru"
          ? "Р—Р°РїСЂРѕСЃ РѕС‚РєР»РѕРЅС‘РЅ."
          : "Anfrage abgelehnt.",
    );
    await loadConnectionRequests(authUser.id);
    await loadChatThreads(authUser.id);
  }

  async function sendChatMessage() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser || !chatPartner?.userId || !chatMessage.trim()) {
      return;
    }

    const messageToSend = chatMessage.trim();
    setChatFeedback(null);

    const { error } = await supabase.from("chat_messages").insert({
      sender_user_id: authUser.id,
      recipient_user_id: chatPartner.userId,
      message: messageToSend,
    });

    if (error) {
      console.error(error);
      setChatFeedback(
        locale === "ru"
          ? "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ СЃРѕРѕР±С‰РµРЅРёРµ."
          : "Die Nachricht konnte nicht gesendet werden.",
      );
      return;
    }

    const { error: notificationError } = await supabase.from("notifications").insert({
      user_id: chatPartner.userId,
      type: "chat_message",
      title: locale === "ru" ? "РќРѕРІРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ" : "Neue Nachricht",
      body: messageToSend.slice(0, 180),
      related_user_id: authUser.id,
      related_chat_user_id: authUser.id,
      is_read: false,
    });

    if (notificationError) {
      console.error(notificationError);
    }

    setChatMessage("");
    setChatFeedback(locale === "ru" ? "РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРѕ." : "Nachricht gesendet.");
    await loadChatMessagesFor(authUser.id, chatPartner.userId);
    await loadChatThreads(authUser.id);
  }

  async function handleAuthSubmit() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setAuthMessage(
        locale === "ru"
          ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ РґР°РЅРЅС‹С… РµС‰С‘ РЅРµ РіРѕС‚РѕРІРѕ."
          : "Die Datenverbindung ist noch nicht bereit.",
      );
      return;
    }

    setAuthLoading(true);
    setAuthMessage(null);

    const normalizedEmail = authEmail.trim();
    const normalizedPassword = authPassword.trim();

    const action =
      authMode === "signup"
        ? supabase.auth.signUp({ email: normalizedEmail, password: normalizedPassword })
        : supabase.auth.signInWithPassword({ email: normalizedEmail, password: normalizedPassword });

    const { data, error } = await action;

    if (error) {
      console.error(error);
      setAuthMessage(
        authMode === "signup"
          ? locale === "ru"
            ? "РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚. РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕС‡С‚Сѓ Рё РїР°СЂРѕР»СЊ."
            : "Das Konto konnte nicht erstellt werden. Bitte prГјfe E-Mail und Passwort."
          : locale === "ru"
            ? "РќРµ СѓРґР°Р»РѕСЃСЊ РІРѕР№С‚Рё. РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕС‡С‚Сѓ Рё РїР°СЂРѕР»СЊ."
            : "Die Anmeldung ist fehlgeschlagen. Bitte prГјfe E-Mail und Passwort.",
      );
      setAuthLoading(false);
      return;
    }

    const signedInUser = data.user ?? data.session?.user ?? null;
    const hasActiveSession = Boolean(data.session);

    if (!signedInUser || !hasActiveSession) {
      if (authMode === "signup" && data.user) {
        setAuthMode("login");
        setAuthMessage(
          locale === "ru"
            ? "РђРєРєР°СѓРЅС‚ СЃРѕР·РґР°РЅ. РўРµРїРµСЂСЊ РІРѕР№РґРёС‚Рµ СЃ СЌС‚РѕР№ РїРѕС‡С‚РѕР№ Рё РїР°СЂРѕР»РµРј."
            : "Das Konto wurde erstellt. Bitte melde dich jetzt mit dieser E-Mail und deinem Passwort an.",
        );
      } else {
        setAuthMessage(
          locale === "ru"
            ? "РђРєРєР°СѓРЅС‚ РµС‰С‘ РЅРµ СѓРґР°Р»РѕСЃСЊ Р°РєС‚РёРІРёСЂРѕРІР°С‚СЊ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РІРѕР№С‚Рё РµС‰С‘ СЂР°Р·."
            : "Das Konto konnte noch nicht aktiviert werden. Bitte versuche die Anmeldung noch einmal.",
        );
      }
      setAuthLoading(false);
      return;
    }

    setAuthMessage(
      authMode === "signup"
        ? locale === "ru"
          ? "РђРєРєР°СѓРЅС‚ СЃРѕР·РґР°РЅ."
          : "Konto erstellt."
        : locale === "ru"
          ? "Р’С…РѕРґ РІС‹РїРѕР»РЅРµРЅ."
          : "Anmeldung erfolgreich.",
    );
    setAuthLoading(false);

    const existingProfile = await loadOwnProfile(signedInUser.id);
    await loadProfiles();
    await loadNotifications(signedInUser.id);
    await loadChatThreads(signedInUser.id);

    if (authMode === "signup") {
      openApp("profile");
      return;
    }

    openApp(existingProfile ? "home" : "profile");
  }

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    setAuthLoading(true);
    setAuthMessage(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      setAuthMessage(locale === "ru" ? "РќРµ СѓРґР°Р»РѕСЃСЊ РІС‹Р№С‚Рё РёР· Р°РєРєР°СѓРЅС‚Р°." : "Die Abmeldung ist fehlgeschlagen.");
      setAuthLoading(false);
      return;
    }

    setAuthMessage(social.logoutSuccess);
    resetAuthStateCache();
    resetAuthenticatedUiCache();
    setCurrentProfile(null);
    setProfileLookupComplete(false);
    setProfileForm(emptyProfileForm);
    setProfilePhotoPreview("");
    setConnectionRequests([]);
    setNotifications([]);
    setChatThreads([]);
    setAuthLoading(false);
    replaceClientPath("/");
  }

  async function handleSaveProfile() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase || !authUser) {
      setProfileMessage(social.authRequired);
      return;
    }

    setProfileSaving(true);
    setProfileMessage(null);

    const payload = buildProfilePayload();

    if (!payload) {
      setProfileSaving(false);
      setProfileMessage(social.authRequired);
      return;
    }

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "user_id" });

    if (error) {
      console.error(error);
      setProfileMessage(
        locale === "ru"
          ? "РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕС…СЂР°РЅРёС‚СЊ РїСЂРѕС„РёР»СЊ. РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕР»СЏ Рё РїРѕРїСЂРѕР±СѓР№С‚Рµ СЃРЅРѕРІР°."
          : "Das Profil konnte nicht gespeichert werden. Bitte prГјfe die Felder und versuche es erneut.",
      );
      setProfileSaving(false);
      return;
    }

    setProfileMessage(locale === "ru" ? "РџСЂРѕС„РёР»СЊ СЃРѕС…СЂР°РЅС‘РЅ." : "Profil gespeichert.");
    setProfileSaving(false);
    await loadProfiles();
    await loadOwnProfile(authUser.id);
    openApp("people");
  }

  async function handleAvatarUpload(event: ChangeEvent<HTMLInputElement>) {
    const supabase = getSupabaseBrowserClient();
    const file = event.target.files?.[0];
    const previousPhotoUrl = profileForm.photoUrl;

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setProfilePhotoPreview(previewUrl);

    if (!supabase || !authUser) {
      URL.revokeObjectURL(previewUrl);
      setProfilePhotoPreview(previousPhotoUrl);
      setProfileMessage(
        locale === "ru"
          ? "Р¤РѕС‚Рѕ РјРѕР¶РЅРѕ СЃРѕС…СЂР°РЅРёС‚СЊ РїРѕСЃР»Рµ РІС…РѕРґР° РІ Р°РєРєР°СѓРЅС‚."
          : "Das Foto kann nach der Anmeldung gespeichert werden.",
      );
      return;
    }

    setAvatarUploading(true);

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storagePath = `${authUser.id}/${Date.now()}-${sanitizedName}`;

      const { error } = await supabase.storage.from(AVATAR_BUCKET).upload(storagePath, file, {
        upsert: true,
        cacheControl: "3600",
      });

      if (error) {
        warnInDevelopment("Avatar upload is unavailable.", error);
        URL.revokeObjectURL(previewUrl);
        setProfilePhotoPreview(previousPhotoUrl);
        setProfileMessage(
          locale === "ru"
            ? "Р¤РѕС‚Рѕ РїРѕРєР° РЅРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РІ С…СЂР°РЅРёР»РёС‰Рµ, РЅРѕ РїСЂРѕС„РёР»СЊ РІСЃС‘ СЂР°РІРЅРѕ РјРѕР¶РЅРѕ СЃРѕС…СЂР°РЅРёС‚СЊ."
            : "Das Foto konnte gerade nicht in den Speicher geladen werden, aber du kannst dein Profil trotzdem speichern.",
        );
        return;
      }

      const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(storagePath);
      const nextPhotoUrl = data.publicUrl;
      URL.revokeObjectURL(previewUrl);
      setProfileForm((current) => ({ ...current, photoUrl: nextPhotoUrl }));
      setProfilePhotoPreview(nextPhotoUrl);
      setCurrentProfile((current) => (current ? { ...current, photo_url: nextPhotoUrl } : current));

      const canPersistPhoto = Boolean(currentProfile) || Boolean(profileForm.name.trim() && profileForm.city.trim());

      if (canPersistPhoto) {
        const payload = buildProfilePayload(nextPhotoUrl);

        if (payload) {
          const { error: profileError } = await supabase.from("profiles").upsert(payload, {
            onConflict: "user_id",
          });

          if (profileError) {
            warnInDevelopment("Avatar URL could not be saved to the profile.", profileError);
            setProfileMessage(
              locale === "ru"
                ? "Р¤РѕС‚Рѕ Р·Р°РіСЂСѓР¶РµРЅРѕ, РЅРѕ РїРѕРєР° РЅРµ РїСЂРёРІСЏР·Р°Р»РѕСЃСЊ Рє Р°РЅРєРµС‚Рµ. РќР°Р¶РјРёС‚Рµ СЃРѕС…СЂР°РЅРёС‚СЊ РїСЂРѕС„РёР»СЊ."
                : "Das Foto wurde hochgeladen, aber noch nicht mit dem Profil verknГјpft. Bitte speichere dein Profil.",
            );
            return;
          }

          await loadProfiles();
          await loadOwnProfile(authUser.id);
          setProfileMessage(locale === "ru" ? "Р¤РѕС‚Рѕ СЃРѕС…СЂР°РЅРµРЅРѕ." : "Foto gespeichert.");
          return;
        }
      }

      setProfileMessage(
        locale === "ru"
          ? "Р¤РѕС‚Рѕ Р·Р°РіСЂСѓР¶РµРЅРѕ. РўРµРїРµСЂСЊ СЃРѕС…СЂР°РЅРёС‚Рµ Р°РЅРєРµС‚Сѓ, С‡С‚РѕР±С‹ РѕРЅРѕ РѕСЃС‚Р°Р»РѕСЃСЊ РІ РїСЂРѕС„РёР»Рµ."
          : "Das Foto wurde hochgeladen. Speichere jetzt dein Profil, damit es erhalten bleibt.",
      );
    } catch (error) {
      warnInDevelopment("Avatar upload failed.", error);
      URL.revokeObjectURL(previewUrl);
      setProfilePhotoPreview(previousPhotoUrl);
      setProfileMessage(
        locale === "ru"
          ? "РҐСЂР°РЅРёР»РёС‰Рµ С„РѕС‚Рѕ РїРѕРєР° РЅРµ РЅР°СЃС‚СЂРѕРµРЅРѕ. РџСЂРѕС„РёР»СЊ РјРѕР¶РЅРѕ СЃРѕС…СЂР°РЅРёС‚СЊ Рё Р±РµР· С„РѕС‚РѕРіСЂР°С„РёРё."
          : "Der Fotospeicher ist noch nicht eingerichtet. Du kannst dein Profil auch ohne Foto speichern.",
      );
    } finally {
      event.target.value = "";
      setAvatarUploading(false);
    }
  }

  if (area === "landing") {
    if (isAuthRoute) {
      return (
        <AuthExperience
          locale={locale}
          social={social}
          authSessionLoading={authSessionLoading}
          authMode={authMode}
          setAuthMode={setAuthMode}
          authEmail={authEmail}
          setAuthEmail={setAuthEmail}
          authPassword={authPassword}
          setAuthPassword={setAuthPassword}
          authLoading={authLoading}
          authMessage={authMessage}
          onAuthSubmit={handleAuthSubmit}
          onSetLocale={setLocale}
        />
      );
    }

    return (
      <LandingExperience
        locale={locale}
        people={publicPeople}
        events={events}
        services={services}
        partners={partners}
        primaryCtaLabel={landingPrimaryCtaLabel}
        secondaryCtaLabel={landingSecondaryCtaLabel}
        onCreateProfile={
          authUser
            ? hasCompletedProfile
              ? () => openApp("home")
              : () => openApp("profile")
            : openAuth
        }
        onFindCommunity={() => openApp("people")}
        onSecondaryCta={authUser && hasCompletedProfile ? () => openApp("profile") : undefined}
        onOpenAppScreen={openApp}
        onSelectArea={openArea}
        onSetLocale={setLocale}
      />
    );
  }

  if (area === "app" && isStandaloneUserRoute) {
    if (authSessionLoading) {
      return (
        <AuthenticatedShell
          locale={locale}
          subtitle={shellSubtitle}
          currentUser={authUser}
          avatarUrl={currentProfile?.photo_url ?? profileForm.photoUrl}
          onSetLocale={setLocale}
          onLogout={handleLogout}
        >
          <div className="mx-auto w-full max-w-[430px] space-y-4">
            <LoadingCard lines={4} />
            <LoadingCard lines={3} />
          </div>
        </AuthenticatedShell>
      );
    }

    return (
      <AuthenticatedShell
        locale={locale}
        subtitle={shellSubtitle}
        currentUser={authUser}
        avatarUrl={currentProfile?.photo_url ?? profileForm.photoUrl}
        onSetLocale={setLocale}
        onLogout={handleLogout}
      >
        <AppExperience
          t={t}
          screen={pendingStandaloneScreen ?? routeState.screen}
          routeScreen={routeState.screen}
          pendingScreen={pendingStandaloneScreen}
          pathname={clientPathname}
          setScreen={openApp}
          people={appPeople}
          communities={communityRows}
          communityMembers={communityMemberRows}
          selectedCommunity={selectedCommunity}
          setSelectedCommunityId={setSelectedCommunityId}
          communitiesLoading={communitiesLoading}
          communityMembersLoading={communityMembersLoading}
          communitiesMessage={communitiesMessage}
          communityActionLoadingId={communityActionLoadingId}
          onJoinCommunity={joinCommunity}
          onLeaveCommunity={leaveCommunity}
          contactPeople={contactPeople}
          events={events}
          eventRows={eventRows}
          eventRsvps={eventRsvpRows}
          selectedEvent={selectedEvent}
          setSelectedEventId={setSelectedEventId}
          eventFeedTab={eventFeedTab}
          setEventFeedTab={setEventFeedTab}
          eventsLoading={eventsLoading}
          eventRsvpsLoading={eventRsvpsLoading}
          eventsMessage={eventsMessage}
          eventActionLoadingId={eventActionLoadingId}
          onRsvpEvent={rsvpEvent}
          onCancelRsvp={cancelRsvp}
          services={services}
          partners={partners}
          appProfileTags={profileTags[locale]}
          connectionRequests={connectionRequests}
          incomingRequests={incomingRequests}
          requestPeople={requestPeople}
          selectedPerson={selectedPerson}
          setSelectedPersonId={setSelectedPersonId}
          personDetailOpen={personDetailOpen}
          setPersonDetailOpen={setPersonDetailOpen}
          requestModalPerson={requestModalPerson}
          requestDraft={requestDraft}
          setRequestDraft={setRequestDraft}
          requestModalMode={requestModalMode}
          requestSending={requestSending}
          onOpenConnectionRequest={openConnectionRequest}
          onCloseConnectionRequest={closeConnectionRequest}
          onSendConnectionRequest={sendConnectionRequest}
          onOpenRequests={openRequests}
          onUpdateConnectionRequestStatus={updateConnectionRequestStatus}
          onOpenChat={openChat}
          profileForm={profileForm}
          setProfileForm={setProfileForm}
            authUser={authUser}
            onSaveProfile={handleSaveProfile}
          onAvatarUpload={handleAvatarUpload}
          profileSaving={profileSaving}
          profileMessage={profileMessage}
          profileLookupComplete={profileLookupComplete}
          profilePhotoPreview={profilePhotoPreview}
          avatarUploading={avatarUploading}
          supabaseConfigured={isSupabaseConfigured}
          profilesLoaded={profilesLoaded}
          profilesLoading={profilesLoading}
          profilesMessage={profilesMessage}
          requestsLoaded={requestsLoaded}
          requestsLoading={requestsLoading}
          requestsMessage={requestsMessage}
          social={social}
          hasProfile={Boolean(currentProfile)}
          chatThreads={chatThreads}
          chatsLoading={chatsLoading || notificationsLoading}
          unreadChatCount={unreadChatCount}
          chatPartner={chatPartner}
          chatMessages={chatMessages}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          chatLoading={chatLoading}
          chatFeedback={chatFeedback}
          chatBottomRef={chatBottomRef}
          onSendChatMessage={sendChatMessage}
          standalone
        />
      </AuthenticatedShell>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-[#F5F7FA]">
      <BackgroundAura />

      <div className="relative mx-auto min-h-screen max-w-[1540px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-2rem)] rounded-[34px] border border-white/10 bg-[rgba(7,11,22,0.72)] shadow-[0_50px_180px_-70px_rgba(0,0,0,0.95)] backdrop-blur-[28px]">
          <header className="sticky top-4 z-40 border-b border-white/8 bg-[rgba(7,11,22,0.78)] px-4 py-4 backdrop-blur-[30px] sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8FA8D6]">
                  {t.appLabel}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                    {t.brand}
                  </h1>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#C7D1E0]">
                    {t.landing.badge}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#A8B6CB] sm:text-[15px]">
                  {t.positioning}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start lg:self-auto">
                <div
                  className="flex h-9 items-center rounded-full border border-white/10 bg-white/[0.06] p-1 text-[11px] font-medium"
                  aria-label={t.languageSwitcherLabel}
                >
                  {(["ru", "de"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setLocale(item)}
                      className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                        locale === item
                          ? "bg-[#007AFF] text-white shadow-[0_0_22px_rgba(0,122,255,0.42)]"
                          : "text-[#8A94A6] hover:text-white"
                      }`}
                    >
                      {t.localeButtons[item]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!isStandaloneUserRoute && (
              <div className="mt-4 flex flex-wrap items-center gap-2 overflow-x-auto">
                {(["landing", "app", "founder", "admin"] as const).map((item) => (
                  <TopTab
                    key={item}
                    label={t.topNav[item]}
                    active={area === item}
                    icon={topNavIcons[item]}
                    onClick={() => openArea(item)}
                  />
                ))}
              </div>
            )}
          </header>

          <section className="px-4 pb-8 pt-5 sm:px-6 lg:px-8">
            {area === "app" && (
              <AppExperience
                t={t}
                screen={appScreen}
                routeScreen={routeState.screen}
                pendingScreen={pendingStandaloneScreen}
                pathname={clientPathname}
                setScreen={openApp}
                people={appPeople}
                communities={communityRows}
                communityMembers={communityMemberRows}
                selectedCommunity={selectedCommunity}
                setSelectedCommunityId={setSelectedCommunityId}
                communitiesLoading={communitiesLoading}
                communityMembersLoading={communityMembersLoading}
                communitiesMessage={communitiesMessage}
                communityActionLoadingId={communityActionLoadingId}
                onJoinCommunity={joinCommunity}
                onLeaveCommunity={leaveCommunity}
                contactPeople={contactPeople}
                events={events}
                eventRows={eventRows}
                eventRsvps={eventRsvpRows}
                selectedEvent={selectedEvent}
                setSelectedEventId={setSelectedEventId}
                eventFeedTab={eventFeedTab}
                setEventFeedTab={setEventFeedTab}
                eventsLoading={eventsLoading}
                eventRsvpsLoading={eventRsvpsLoading}
                eventsMessage={eventsMessage}
                eventActionLoadingId={eventActionLoadingId}
                onRsvpEvent={rsvpEvent}
                onCancelRsvp={cancelRsvp}
                services={services}
                partners={partners}
                appProfileTags={profileTags[locale]}
                connectionRequests={connectionRequests}
                incomingRequests={incomingRequests}
                requestPeople={requestPeople}
                selectedPerson={selectedPerson}
                setSelectedPersonId={setSelectedPersonId}
                personDetailOpen={personDetailOpen}
                setPersonDetailOpen={setPersonDetailOpen}
                requestModalPerson={requestModalPerson}
                requestDraft={requestDraft}
                setRequestDraft={setRequestDraft}
                requestModalMode={requestModalMode}
                requestSending={requestSending}
                onOpenConnectionRequest={openConnectionRequest}
                onCloseConnectionRequest={closeConnectionRequest}
                onSendConnectionRequest={sendConnectionRequest}
                onOpenRequests={openRequests}
                onUpdateConnectionRequestStatus={updateConnectionRequestStatus}
                onOpenChat={openChat}
                profileForm={profileForm}
                setProfileForm={setProfileForm}
                authUser={authUser}
                onSaveProfile={handleSaveProfile}
                onAvatarUpload={handleAvatarUpload}
                profileSaving={profileSaving}
                profileMessage={profileMessage}
                profileLookupComplete={profileLookupComplete}
                profilePhotoPreview={profilePhotoPreview}
                avatarUploading={avatarUploading}
                supabaseConfigured={isSupabaseConfigured}
                profilesLoaded={profilesLoaded}
                profilesLoading={profilesLoading}
                profilesMessage={profilesMessage}
                requestsLoaded={requestsLoaded}
                requestsLoading={requestsLoading}
                requestsMessage={requestsMessage}
                social={social}
                hasProfile={Boolean(currentProfile)}
                chatThreads={chatThreads}
                chatsLoading={chatsLoading || notificationsLoading}
                unreadChatCount={unreadChatCount}
                chatPartner={chatPartner}
                chatMessages={chatMessages}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}
                chatLoading={chatLoading}
                chatFeedback={chatFeedback}
                chatBottomRef={chatBottomRef}
                onSendChatMessage={sendChatMessage}
              />
            )}

            {area === "founder" && (
              <FounderDashboard
                t={t}
                locale={locale}
                founderMetrics={founderMetrics}
                founderFunnel={founderFunnel}
                founderCharts={founderCharts}
                communityPipeline={communityPipeline}
                revenueCards={revenueCards}
              />
            )}

            {area === "admin" && (
              <AdminDashboard
                t={t}
                locale={locale}
                adminMetrics={adminMetrics}
                people={publicPeople}
                events={events}
                adminOffers={adminOffers}
                moderationQueue={moderationQueue}
              />
            )}
          </section>

          <footer className="border-t border-white/8 px-4 py-4 text-xs leading-6 text-[#95A6BE] sm:px-6 lg:px-8">
            {t.footerNote}
          </footer>
        </div>
      </div>
    </main>
  );
}

function LandingExperience({
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
  onSelectArea,
  onSetLocale,
}: {
  locale: Locale;
  people: Person[];
  events: (typeof eventsByLocale)[Locale];
  services: (typeof servicesByLocale)[Locale];
  partners: (typeof partnersByLocale)[Locale];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onCreateProfile: () => void;
  onFindCommunity: () => void;
  onSecondaryCta?: () => void;
  onOpenAppScreen: (screen: AppScreen) => void;
  onSelectArea: (area: ProductArea) => void;
  onSetLocale: (locale: Locale) => void;
}) {
  return (
    <LandingSurface
      locale={locale}
      people={people}
      events={events}
      services={services}
      partners={partners}
      primaryCtaLabel={primaryCtaLabel}
      secondaryCtaLabel={secondaryCtaLabel}
      onCreateProfile={onCreateProfile}
      onFindCommunity={onFindCommunity}
      onSecondaryCta={onSecondaryCta}
      onOpenAppScreen={onOpenAppScreen}
      onSelectArea={onSelectArea}
      onSetLocale={onSetLocale}
    />
  );
}

function AuthExperience({
  locale,
  social,
  authSessionLoading,
  authMode,
  setAuthMode,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authLoading,
  authMessage,
  onAuthSubmit,
  onSetLocale,
}: {
  locale: Locale;
  social: (typeof socialCopy)[Locale];
  authSessionLoading: boolean;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  authEmail: string;
  setAuthEmail: (value: string) => void;
  authPassword: string;
  setAuthPassword: (value: string) => void;
  authLoading: boolean;
  authMessage: string | null;
  onAuthSubmit: () => Promise<void>;
  onSetLocale: (locale: Locale) => void;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-[#F5F7FA]">
      <BackgroundAura />
      <div className="relative mx-auto flex min-h-screen max-w-[720px] items-center px-4 py-8 sm:px-6">
        <div className="w-full rounded-[34px] border border-white/10 bg-[rgba(7,11,22,0.78)] p-6 shadow-[0_50px_180px_-70px_rgba(0,0,0,0.95)] backdrop-blur-[28px] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8FA8D6]">
                NeuStart
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                {social.authStandaloneTitle}
              </h1>
            </div>

            <div className="flex h-9 items-center rounded-full border border-white/10 bg-white/[0.06] p-1 text-[11px] font-medium">
              {(["ru", "de"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => onSetLocale(item)}
                  className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                    locale === item
                      ? "bg-[#007AFF] text-white shadow-[0_0_22px_rgba(0,122,255,0.42)]"
                      : "text-[#8A94A6] hover:text-white"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              onClick={() => setAuthMode("signup")}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                authMode === "signup"
                  ? "bg-[#007AFF] text-white"
                  : "border border-white/10 bg-white/[0.05] text-[#A8B6CB]"
              }`}
            >
              {social.signup}
            </button>
            <button
              onClick={() => setAuthMode("login")}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                authMode === "login"
                  ? "bg-[#007AFF] text-white"
                  : "border border-white/10 bg-white/[0.05] text-[#A8B6CB]"
              }`}
            >
              {social.login}
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <MobileField
              label={social.email}
              placeholder={social.emailPlaceholder}
              value={authEmail}
              onChange={setAuthEmail}
              type="email"
            />
            <MobileField
              label={social.password}
              placeholder={social.passwordPlaceholder}
              value={authPassword}
              onChange={setAuthPassword}
              type="password"
            />
            <button
              onClick={() => void onAuthSubmit()}
              disabled={authSessionLoading || authLoading || !authEmail.trim() || !authPassword.trim()}
              className="w-full rounded-[20px] bg-[#007AFF] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {authSessionLoading ? "..." : authLoading ? "..." : authMode === "signup" ? social.signup : social.login}
            </button>
          </div>
          {authMessage && <InlineNote text={authMessage} tone="info" className="mt-5" />}
        </div>
      </div>
    </main>
  );
}

function UserLoadingScreen({
  locale,
  title,
  text,
  onSetLocale,
}: {
  locale: Locale;
  title: string;
  text: string;
  onSetLocale: (locale: Locale) => void;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-[#F5F7FA]">
      <BackgroundAura />
      <div className="relative mx-auto flex min-h-screen max-w-[720px] items-center px-4 py-8 sm:px-6">
        <div className="w-full rounded-[34px] border border-white/10 bg-[rgba(7,11,22,0.78)] p-6 shadow-[0_50px_180px_-70px_rgba(0,0,0,0.95)] backdrop-blur-[28px] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8FA8D6]">
                NeuStart
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
                {title}
              </h1>
            </div>

            <div className="flex h-9 items-center rounded-full border border-white/10 bg-white/[0.06] p-1 text-[11px] font-medium">
              {(["ru", "de"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => onSetLocale(item)}
                  className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                    locale === item
                      ? "bg-[#007AFF] text-white shadow-[0_0_22px_rgba(0,122,255,0.42)]"
                      : "text-[#8A94A6] hover:text-white"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm leading-7 text-[#D8E6FF]">{text}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function AuthenticatedShell({
  locale,
  subtitle,
  currentUser,
  avatarUrl,
  onSetLocale,
  onLogout,
  children,
}: {
  locale: Locale;
  subtitle: string;
  currentUser: User | null;
  avatarUrl?: string | null;
  onSetLocale: (locale: Locale) => void;
  onLogout: () => Promise<void>;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] pb-[calc(112px+env(safe-area-inset-bottom))] text-[#F5F7FA]">
      <BackgroundAura />
      <div className="relative mx-auto min-h-screen max-w-[720px] px-4 py-6 sm:px-6">
        <header className="sticky top-4 z-40 mb-6 rounded-[30px] border border-white/10 bg-[rgba(7,11,22,0.78)] px-4 py-4 shadow-[0_30px_100px_-50px_rgba(0,0,0,1)] backdrop-blur-[28px] sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#007AFF] text-base font-semibold text-white shadow-[0_12px_32px_-18px_rgba(0,122,255,0.95)]">
                  N
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold tracking-[-0.04em] text-white">
                    NeuStart
                  </p>
                  <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8FA8D6]">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex h-9 items-center rounded-full border border-white/10 bg-white/[0.06] p-1 text-[11px] font-medium"
                aria-label={locale === "ru" ? "РџРµСЂРµРєР»СЋС‡РёС‚СЊ СЏР·С‹Рє" : "Sprache wechseln"}
              >
                {(["ru", "de"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => onSetLocale(item)}
                    className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                      locale === item
                        ? "bg-[#007AFF] text-white shadow-[0_0_22px_rgba(0,122,255,0.42)]"
                        : "text-[#8A94A6] hover:text-white"
                    }`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold text-white">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={currentUser?.email ?? "User avatar"}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  getInitials(currentUser?.email?.split("@")[0] ?? "Neu Start")
                )}
              </div>

              <button
                onClick={() => void onLogout()}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-white"
              >
                <LogOut className="h-4 w-4" />
                {locale === "ru" ? "Р’С‹Р№С‚Рё" : "Abmelden"}
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}

function AppExperience({
  t,
  screen,
  routeScreen,
  pendingScreen,
  pathname,
  setScreen,
  people,
  communities,
  communityMembers,
  selectedCommunity,
  setSelectedCommunityId,
  communitiesLoading,
  communityMembersLoading,
  communitiesMessage,
  communityActionLoadingId,
  onJoinCommunity,
  onLeaveCommunity,
  contactPeople,
  events,
  eventRows,
  eventRsvps,
  selectedEvent,
  setSelectedEventId,
  eventFeedTab,
  setEventFeedTab,
  eventsLoading,
  eventRsvpsLoading,
  eventsMessage,
  eventActionLoadingId,
  onRsvpEvent,
  onCancelRsvp,
  services,
  partners,
  appProfileTags,
  connectionRequests,
  incomingRequests,
  requestPeople,
  selectedPerson,
  setSelectedPersonId,
  personDetailOpen,
  setPersonDetailOpen,
  requestModalPerson,
  requestDraft,
  setRequestDraft,
  requestModalMode,
  requestSending,
  onOpenConnectionRequest,
  onCloseConnectionRequest,
  onSendConnectionRequest,
  onOpenRequests,
  onUpdateConnectionRequestStatus,
  onOpenChat,
  profileForm,
  setProfileForm,
  authUser,
  onSaveProfile,
  onAvatarUpload,
  profileSaving,
  profileMessage,
  profileLookupComplete,
  profilePhotoPreview,
  avatarUploading,
  supabaseConfigured,
  profilesLoaded,
  profilesLoading,
  profilesMessage,
  requestsLoaded,
  requestsLoading,
  requestsMessage,
  social,
  hasProfile,
  chatThreads,
  chatsLoading,
  unreadChatCount,
  chatPartner,
  chatMessages,
  chatMessage,
  setChatMessage,
  chatLoading,
  chatFeedback,
  chatBottomRef,
  onSendChatMessage,
  standalone,
}: {
  t: (typeof translations)[Locale];
  screen: AppScreen;
  routeScreen: AppScreen;
  pendingScreen: AppScreen | null;
  pathname: string;
  setScreen: (screen: AppScreen) => void;
  people: Person[];
  communities: CommunityRow[];
  communityMembers: CommunityMemberRow[];
  selectedCommunity: CommunityRow | null;
  setSelectedCommunityId: Dispatch<SetStateAction<string | null>>;
  communitiesLoading: boolean;
  communityMembersLoading: boolean;
  communitiesMessage: string | null;
  communityActionLoadingId: string | null;
  onJoinCommunity: (communityId: string) => Promise<void>;
  onLeaveCommunity: (communityId: string) => Promise<void>;
  contactPeople: Person[];
  events: (typeof eventsByLocale)[Locale];
  eventRows: EventRow[];
  eventRsvps: EventRsvpRow[];
  selectedEvent: EventRow | null;
  setSelectedEventId: Dispatch<SetStateAction<string | null>>;
  eventFeedTab: "upcoming" | "mine";
  setEventFeedTab: Dispatch<SetStateAction<"upcoming" | "mine">>;
  eventsLoading: boolean;
  eventRsvpsLoading: boolean;
  eventsMessage: string | null;
  eventActionLoadingId: string | null;
  onRsvpEvent: (eventId: string) => Promise<void>;
  onCancelRsvp: (eventId: string) => Promise<void>;
  services: (typeof servicesByLocale)[Locale];
  partners: (typeof partnersByLocale)[Locale];
  appProfileTags: (typeof profileTags)[Locale];
  connectionRequests: ConnectionRequestRow[];
  incomingRequests: ConnectionRequestRow[];
  requestPeople: Person[];
  selectedPerson: Person | undefined;
  setSelectedPersonId: (id: number) => void;
  personDetailOpen: boolean;
  setPersonDetailOpen: Dispatch<SetStateAction<boolean>>;
  requestModalPerson: Person | null;
  requestDraft: string;
  setRequestDraft: Dispatch<SetStateAction<string>>;
  requestModalMode: "compose" | "success";
  requestSending: boolean;
  onOpenConnectionRequest: (person: Person) => void;
  onCloseConnectionRequest: () => void;
  onSendConnectionRequest: () => Promise<void>;
  onOpenRequests: () => void;
  onUpdateConnectionRequestStatus: (
    requestId: string,
    status: Extract<ConnectionRequestStatus, "accepted" | "declined">,
  ) => Promise<void>;
  onOpenChat: (partnerUserId: string) => void;
  profileForm: ProfileFormState;
  setProfileForm: Dispatch<SetStateAction<ProfileFormState>>;
  authUser: User | null;
  onSaveProfile: () => Promise<void>;
  onAvatarUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  profileSaving: boolean;
  profileMessage: string | null;
  profileLookupComplete: boolean;
  profilePhotoPreview: string;
  avatarUploading: boolean;
  supabaseConfigured: boolean;
  profilesLoaded: boolean;
  profilesLoading: boolean;
  profilesMessage: string | null;
  requestsLoaded: boolean;
  requestsLoading: boolean;
  requestsMessage: string | null;
  social: (typeof socialCopy)[Locale];
  hasProfile: boolean;
  chatThreads: ChatThreadSummary[];
  chatsLoading: boolean;
  unreadChatCount: number;
  chatPartner: Person | undefined;
  chatMessages: ChatMessageRow[];
  chatMessage: string;
  setChatMessage: Dispatch<SetStateAction<string>>;
  chatLoading: boolean;
  chatFeedback: string | null;
  chatBottomRef: RefObject<HTMLDivElement | null>;
  onSendChatMessage: () => Promise<void>;
  standalone?: boolean;
}) {
  const isRuLocale = social === socialCopy.ru;
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [eventReferenceNow] = useState(() => Date.now());
  const navLabels = {
    home: isRuLocale ? "Р“Р»Р°РІРЅР°СЏ" : "Start",
    people: isRuLocale ? "Р›СЋРґРё" : "Menschen",
    chats: isRuLocale ? "Р§Р°С‚С‹" : "Chats",
    events: isRuLocale ? "РЎРѕР±С‹С‚РёСЏ" : "Events",
    profile: isRuLocale ? "РџСЂРѕС„РёР»СЊ" : "Profil",
  } as const;
  const activeScreen =
    standalone
      ? screen
      : supabaseConfigured && authUser && profileLookupComplete && !hasProfile && screen !== "profile"
        ? "profile"
        : screen;
  const isPersonDetailVisible =
    (activeScreen === "people" || activeScreen === "contacts") &&
    personDetailOpen &&
    Boolean(selectedPerson);
  const activeNavScreen =
    activeScreen === "requests" || activeScreen === "chat"
      ? "contacts"
      : activeScreen === "communities"
        ? "events"
      : activeScreen === "profile"
        ? "profile"
        : activeScreen;
  const canSaveProfile =
    Boolean(authUser) &&
    Boolean(profileForm.name.trim()) &&
    Boolean(profileForm.city.trim()) &&
    !profileSaving &&
    supabaseConfigured;
  const currentIncomingRequestCount = incomingRequests.length;
  const isProfileReadyToRender = !supabaseConfigured || hasProfile || profileLookupComplete;
  const shouldShowHomeLoading =
    supabaseConfigured && Boolean(authUser) && !profileLookupComplete && !hasProfile;
  const connectionActionCopy = {
    no_request: isRuLocale ? "рџ¤ќ РџРѕР·РЅР°РєРѕРјРёС‚СЊСЃСЏ" : "рџ¤ќ Kennenlernen",
    pending_sent: isRuLocale ? "вЏі Р—Р°РїСЂРѕСЃ РѕС‚РїСЂР°РІР»РµРЅ" : "вЏі Anfrage gesendet",
    pending_received: isRuLocale ? "РћС‚РІРµС‚РёС‚СЊ РЅР° Р·Р°РїСЂРѕСЃ" : "Auf Anfrage antworten",
    accepted: isRuLocale ? "рџ’¬ РћС‚РєСЂС‹С‚СЊ С‡Р°С‚" : "рџ’¬ Chat Г¶ffnen",
    declined: isRuLocale ? "Р—Р°РїСЂРѕСЃ РѕС‚РєР»РѕРЅС‘РЅ" : "Anfrage abgelehnt",
  } satisfies Record<ConnectionState, string>;

  function getPersonConnectionState(person: Person): ConnectionState {
    return getConnectionState(connectionRequests, authUser?.id, person.userId);
  }

  const discoveryPeople = people.filter((person) => getPersonConnectionState(person) === "no_request");
  const pendingSentPeople = people.filter(
    (person) => getPersonConnectionState(person) === "pending_sent",
  );
  const pendingReceivedPeople = people.filter(
    (person) => getPersonConnectionState(person) === "pending_received",
  );
  const hasResolvedPeopleData = profilesLoaded;
  const hasResolvedConnectionStates = requestsLoaded;
  const shouldShowPeopleLoading =
    supabaseConfigured &&
    authUser !== null &&
    (!hasResolvedPeopleData || !hasResolvedConnectionStates);
  const shouldShowChatsLoading = chatsLoading && chatThreads.length === 0;
  const shouldShowCommunitiesLoading = communitiesLoading || communityMembersLoading;
  const shouldShowEventsLoading = eventsLoading || eventRsvpsLoading;
  const communityLoadMessage =
    communitiesMessage && (isRuLocale ? "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РґР°РЅРЅС‹Рµ" : "Daten konnten nicht geladen werden");
  const eventLoadMessage =
    eventsMessage && (isRuLocale ? "РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РґР°РЅРЅС‹Рµ" : "Daten konnten nicht geladen werden");
  const sortedEventRows = [...eventRows].sort(
    (left, right) => new Date(left.starts_at).getTime() - new Date(right.starts_at).getTime(),
  );
  const futureEventRows = sortedEventRows.filter(
    (eventRow) => new Date(eventRow.starts_at).getTime() >= eventReferenceNow,
  );
  const myCommunityMemberships = communityMembers.filter((item) => item.user_id === authUser?.id);
  const joinedCommunityIds = new Set(myCommunityMemberships.map((item) => item.community_id));
  const memberCountByCommunityId = new Map<string, number>();
  for (const membership of communityMembers) {
    memberCountByCommunityId.set(
      membership.community_id,
      (memberCountByCommunityId.get(membership.community_id) ?? 0) + 1,
    );
  }
  const rsvpCountByEventId = new Map<string, number>();
  for (const rsvp of eventRsvps) {
    if (rsvp.status === "going" || rsvp.status === "maybe") {
      rsvpCountByEventId.set(rsvp.event_id, (rsvpCountByEventId.get(rsvp.event_id) ?? 0) + 1);
    }
  }
  const myEventRsvpByEventId = new Map(
    eventRsvps.filter((item) => item.user_id === authUser?.id).map((item) => [item.event_id, item] as const),
  );
  const myEventRows = futureEventRows.filter((eventRow) => myEventRsvpByEventId.has(eventRow.id));

  function getConnectionAction(person: Person): {
    label: string;
    disabled: boolean;
    onClick: () => void;
  } {
    const state = getPersonConnectionState(person);

    if (state === "accepted") {
      return {
        label: connectionActionCopy.accepted,
        disabled: false,
        onClick: () => {
          if (person.userId) {
            onOpenChat(person.userId);
          }
        },
      };
    }

    if (state === "pending_received") {
      return {
        label: connectionActionCopy.pending_received,
        disabled: false,
        onClick: onOpenRequests,
      };
    }

    if (state === "pending_sent") {
      return {
        label: connectionActionCopy.pending_sent,
        disabled: true,
        onClick: () => {},
      };
    }

    if (state === "declined") {
      return {
        label: connectionActionCopy.declined,
        disabled: true,
        onClick: () => {},
      };
    }

    return {
      label: connectionActionCopy.no_request,
      disabled: false,
      onClick: () => onOpenConnectionRequest(person),
    };
  }

  return (
    <div className="space-y-6">
      {!standalone && <SectionIntro badge={t.app.badge} title={t.app.title} text={t.app.text} />}

      <div className="mx-auto w-full max-w-[430px]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(8,12,24,0.98))] shadow-[0_50px_130px_-60px_rgba(0,0,0,1)]">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8FA8D6]">
              {t.brand}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
              {standalone ? social.appStandaloneTitle : t.app.homeTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#A8B6CB]">
              {standalone ? social.appStandaloneText : t.app.text}
            </p>
          </div>

          <div className="min-h-[760px] px-4 pb-28 pt-4">
            {activeScreen === "home" && (
              <div className="space-y-4">
                {shouldShowHomeLoading ? (
                  <>
                    <LoadingCard lines={4} />
                    <LoadingCard lines={3} />
                  </>
                ) : (
                  <>
                    <MobileHeroCard
                      title={isRuLocale ? "Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ NeuStart" : "Willkommen bei NeuStart"}
                      text={
                        isRuLocale
                          ? "Р—РґРµСЃСЊ РЅР°С‡РёРЅР°РµС‚СЃСЏ РІР°С€ РЅРѕРІС‹Р№ СЃС‚Р°СЂС‚: Р·Р°РїРѕР»РЅРёС‚Рµ РїСЂРѕС„РёР»СЊ, РЅР°Р№РґРёС‚Рµ Р»СЋРґРµР№ Рё РїРµСЂРµС…РѕРґРёС‚Рµ Рє Р¶РёРІРѕРјСѓ РѕР±С‰РµРЅРёСЋ."
                          : "Hier beginnt dein sanfter Neustart: Profil ausfГјllen, Menschen finden und zu echten Begegnungen wechseln."
                      }
                      onPrimary={() => setScreen("profile")}
                      onSecondary={() => setScreen("people")}
                      primaryLabel={
                        hasProfile
                          ? isRuLocale
                            ? "Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РїСЂРѕС„РёР»СЊ"
                            : "Profil bearbeiten"
                          : isRuLocale
                            ? "Р—Р°РїРѕР»РЅРёС‚СЊ РїСЂРѕС„РёР»СЊ"
                            : "Profil ausfГјllen"
                      }
                      secondaryLabel={isRuLocale ? "РћС‚РєСЂС‹С‚СЊ Р»СЋРґРµР№" : "Menschen Г¶ffnen"}
                    />

                    <div className="grid gap-3">
                      <OnboardingStepCard
                        title={isRuLocale ? "Р—Р°РїРѕР»РЅРёС‚Рµ РїСЂРѕС„РёР»СЊ" : "Profil ausfГјllen"}
                        text={
                          isRuLocale
                            ? "РџР°СЂР° РјРёРЅСѓС‚ РЅР° РёРјСЏ, РіРѕСЂРѕРґ Рё РёРЅС‚РµСЂРµСЃС‹ вЂ” Рё РІ РїСЂРёР»РѕР¶РµРЅРёРё РІР°СЃ СѓР¶Рµ СЃРјРѕРіСѓС‚ СѓРІРёРґРµС‚СЊ."
                            : "Ein paar Minuten fГјr Name, Stadt und Interessen вЂ” und du wirst in der App sichtbar."
                        }
                      />
                      <OnboardingStepCard
                        title={isRuLocale ? "РџРѕР·РЅР°РєРѕРјСЊС‚РµСЃСЊ СЃ Р»СЋРґСЊРјРё" : "Menschen kennenlernen"}
                        text={
                          isRuLocale
                            ? "NeuStart РїРѕРєР°Р·С‹РІР°РµС‚ С‚РѕР»СЊРєРѕ РЅРѕРІС‹Рµ РїРѕР»РµР·РЅС‹Рµ Р·РЅР°РєРѕРјСЃС‚РІР° Р±РµР· Р±РµСЃРєРѕРЅРµС‡РЅРѕР№ Р»РµРЅС‚С‹."
                            : "NeuStart zeigt dir nur neue, hilfreiche Kontakte statt einer endlosen Timeline."
                        }
                      />
                      <OnboardingStepCard
                        title={isRuLocale ? "РџРѕСЃРµС‰Р°Р№С‚Рµ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ" : "Events besuchen"}
                        text={
                          isRuLocale
                            ? "РћС‡РµРЅСЊ СЃРєРѕСЂРѕ Р·РґРµСЃСЊ РїРѕСЏРІСЏС‚СЃСЏ Р»РѕРєР°Р»СЊРЅС‹Рµ РІСЃС‚СЂРµС‡Рё Рё community-С„РѕСЂРјР°С‚С‹."
                            : "Als NГ¤chstes erscheinen hier ruhige lokale Treffen und Community-Formate."
                        }
                      />
                    </div>

                    <SmallSection title={t.app.matchesTitle} text={t.app.matchesText} />
                    {discoveryPeople.slice(0, 2).map((person) => (
                      <MobileMatchCard
                        key={person.id}
                        person={person}
                        reasonLabel={t.app.reasonLabel}
                        buttonLabel={t.app.weeklyConnect}
                        onClick={() => {
                          setSelectedPersonId(person.id);
                          setScreen("people");
                        }}
                      />
                    ))}
                    {!discoveryPeople.length && (
                      <EmptyMobileCard
                        title={isRuLocale ? "РџРѕРєР° РЅРµС‚ РЅРѕРІС‹С… РєРѕРЅС‚Р°РєС‚РѕРІ" : "Noch keine neuen Kontakte"}
                        text={
                          isRuLocale
                            ? "РљР°Рє С‚РѕР»СЊРєРѕ РІ СЃРѕРѕР±С‰РµСЃС‚РІРµ РїРѕСЏРІСЏС‚СЃСЏ РЅРѕРІС‹Рµ РїРѕРґС…РѕРґСЏС‰РёРµ Р»СЋРґРё, РѕРЅРё РѕС‚РѕР±СЂР°Р·СЏС‚СЃСЏ Р·РґРµСЃСЊ."
                            : "Sobald neue passende Menschen in der Community auftauchen, erscheinen sie hier."
                        }
                      />
                    )}

                    <SmallSection title={t.app.servicesTitle} text={t.app.servicesText} />
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service, index) => (
                        <SoftServiceCard
                          key={service.title}
                          title={service.title}
                          subtitle={service.subtitle}
                          detail={service.detail}
                          icon={serviceIcons[index] ?? BriefcaseBusiness}
                          compact
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeScreen === "people" && (
              <div className="space-y-4">
                <SmallSection title={t.app.peopleTitle} text={t.app.peopleText} />
                {!supabaseConfigured && (
                  <InfoBanner
                    title={isRuLocale ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ РґР°РЅРЅС‹С…" : "Datenverbindung"}
                    text={
                      isRuLocale
                        ? "Р”Р°РЅРЅС‹Рµ СЃРѕРѕР±С‰РµСЃС‚РІР° РµС‰С‘ РїРѕРґРєР»СЋС‡Р°СЋС‚СЃСЏ. РљР°Рє С‚РѕР»СЊРєРѕ СЃРѕРµРґРёРЅРµРЅРёРµ Р±СѓРґРµС‚ РіРѕС‚РѕРІРѕ, Р·РґРµСЃСЊ РїРѕСЏРІСЏС‚СЃСЏ СЂРµР°Р»СЊРЅС‹Рµ Р»СЋРґРё."
                        : "Die Community-Daten werden noch verbunden. Sobald die Verbindung bereit ist, erscheinen hier echte Menschen."
                    }
                  />
                )}
                {shouldShowPeopleLoading && <InlineNote text={social.loadingProfiles} />}
                {profilesMessage && <InlineNote text={profilesMessage} tone="warning" />}
                {shouldShowPeopleLoading && <LoadingCard lines={4} />}
                {!shouldShowPeopleLoading &&
                  !profilesLoading &&
                  discoveryPeople.length === 0 &&
                  pendingSentPeople.length === 0 &&
                  pendingReceivedPeople.length === 0 && (
                  <EmptyMobileCard
                    title={social.noProfilesTitle}
                    text={supabaseConfigured ? social.emptyPeopleText : social.noProfilesText}
                  />
                )}
                {isPersonDetailVisible && selectedPerson ? (
                  <PersonDetailCard
                    person={selectedPerson}
                    locale={isRuLocale ? "ru" : "de"}
                    languageLabel={t.app.germanLevel}
                    interestsLabel={t.app.interestsTitle}
                    lookingForLabel={t.app.lookingForTitle}
                    aboutLabel={t.app.profileFields.about}
                    backLabel={isRuLocale ? "РќР°Р·Р°Рґ" : "ZurГјck"}
                    actionLabel={getConnectionAction(selectedPerson).label}
                    actionDisabled={getConnectionAction(selectedPerson).disabled}
                    onBack={() => setPersonDetailOpen(false)}
                    onAction={getConnectionAction(selectedPerson).onClick}
                  />
                ) : (
                  <>
                    {discoveryPeople.map((person) => (
                      <PeopleDiscoveryCard
                        key={person.id}
                        person={person}
                        languageLabel={t.app.germanLevel}
                        addLabel={getConnectionAction(person).label}
                        addDisabled={getConnectionAction(person).disabled}
                        profileStatusLabel={t.profileStatus}
                        onOpen={() => {
                          setSelectedPersonId(person.id);
                          setPersonDetailOpen(true);
                        }}
                        onAdd={getConnectionAction(person).onClick}
                      />
                    ))}

                    {pendingSentPeople.length > 0 && (
                      <div className="space-y-3">
                        <SmallSection
                          title={isRuLocale ? "РћР¶РёРґР°СЋС‚ РѕС‚РІРµС‚Р°" : "Warten auf Antwort"}
                          text={
                            isRuLocale
                              ? "Р’С‹ СѓР¶Рµ РѕС‚РїСЂР°РІРёР»Рё СЌС‚РёРј Р»СЋРґСЏРј Р·Р°РїСЂРѕСЃ РЅР° Р·РЅР°РєРѕРјСЃС‚РІРѕ."
                              : "Diesen Personen hast du bereits eine Anfrage geschickt."
                          }
                        />
                        {pendingSentPeople.map((person) => (
                          <PeopleDiscoveryCard
                            key={`pending-sent-${person.id}`}
                            person={person}
                            languageLabel={t.app.germanLevel}
                            addLabel={getConnectionAction(person).label}
                            addDisabled={getConnectionAction(person).disabled}
                            profileStatusLabel={t.profileStatus}
                            onOpen={() => {
                              setSelectedPersonId(person.id);
                              setPersonDetailOpen(true);
                            }}
                            onAdd={getConnectionAction(person).onClick}
                          />
                        ))}
                      </div>
                    )}

                    {pendingReceivedPeople.length > 0 && (
                      <div className="space-y-3">
                        <SmallSection
                          title={isRuLocale ? "Р–РґСѓС‚ РІР°С€РµРіРѕ РѕС‚РІРµС‚Р°" : "Warten auf deine Antwort"}
                          text={
                            isRuLocale
                              ? "Р­С‚Рё СѓС‡Р°СЃС‚РЅРёРєРё СѓР¶Рµ РѕС‚РїСЂР°РІРёР»Рё РІР°Рј Р·Р°РїСЂРѕСЃ. РњРѕР¶РЅРѕ СЃСЂР°Р·Сѓ РїРµСЂРµР№С‚Рё Рє РѕС‚РІРµС‚Сѓ."
                              : "Diese Mitglieder haben dir bereits geschrieben. Du kannst direkt antworten."
                          }
                        />
                        {pendingReceivedPeople.map((person) => (
                          <PeopleDiscoveryCard
                            key={`pending-received-${person.id}`}
                            person={person}
                            languageLabel={t.app.germanLevel}
                            addLabel={getConnectionAction(person).label}
                            addDisabled={getConnectionAction(person).disabled}
                            profileStatusLabel={t.profileStatus}
                            onOpen={() => {
                              setSelectedPersonId(person.id);
                              setPersonDetailOpen(true);
                            }}
                            onAdd={getConnectionAction(person).onClick}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeScreen === "matches" && (
              <div className="space-y-4">
                <SmallSection title={t.app.matchesTitle} text={t.app.matchesText} />
                {people.map((person) => (
                  <MobileMatchCard
                    key={person.id}
                    person={person}
                    reasonLabel={t.app.reasonLabel}
                    buttonLabel={t.app.weeklyConnect}
                    onClick={() => {
                      setSelectedPersonId(person.id);
                      setPersonDetailOpen(true);
                      setScreen("people");
                    }}
                  />
                ))}
              </div>
            )}

            {activeScreen === "communities" && (
              <div className="space-y-4">
                <SmallSection
                  title={isRuLocale ? "РЎРѕРѕР±С‰РµСЃС‚РІР°" : "Communities"}
                  text={
                    isRuLocale
                      ? "РџСЂРёСЃРѕРµРґРёРЅСЏР№С‚РµСЃСЊ Рє Р»РѕРєР°Р»СЊРЅС‹Рј РєСЂСѓРіР°Рј, РіРґРµ РїСЂРѕС‰Рµ РЅР°Р№С‚Рё РѕРїРѕСЂСѓ, СЃРѕР±С‹С‚РёСЏ Рё Р»СЋРґРµР№ СЂСЏРґРѕРј."
                      : "Tritt lokalen Communities bei, in denen du leichter Halt, Events und passende Menschen findest."
                  }
                />
                {communityLoadMessage && <InlineNote text={communityLoadMessage} tone="warning" />}
                {shouldShowCommunitiesLoading ? (
                  <div className="space-y-4">
                    <LoadingCard lines={4} />
                    <LoadingCard lines={3} />
                  </div>
                ) : communities.length === 0 ? (
                  <EmptyMobileCard
                    title={isRuLocale ? "РџРѕРєР° РЅРµС‚ СЃРѕРѕР±С‰РµСЃС‚РІ" : "Noch keine Communities"}
                    text={
                      isRuLocale
                        ? "Пока здесь нет сообществ. Как только появятся первые круги Riwvel, они сразу отобразятся здесь."
                        : "Noch keine Communities. Sobald die ersten Riwvel-Gruppen angelegt sind, erscheinen sie hier."
                    }
                  />
                ) : selectedCommunity ? (
                  <CommunityDetailCard
                    locale={isRuLocale ? "ru" : "de"}
                    community={selectedCommunity}
                    memberCount={memberCountByCommunityId.get(selectedCommunity.id) ?? 0}
                    joined={joinedCommunityIds.has(selectedCommunity.id)}
                    loading={communityActionLoadingId === selectedCommunity.id}
                    onBack={() => setSelectedCommunityId(null)}
                    onJoin={() => void onJoinCommunity(selectedCommunity.id)}
                    onLeave={() => void onLeaveCommunity(selectedCommunity.id)}
                  />
                ) : (
                  communities.map((community) => (
                    <CommunityListCard
                      key={community.id}
                      locale={isRuLocale ? "ru" : "de"}
                      community={community}
                      memberCount={memberCountByCommunityId.get(community.id) ?? 0}
                      joined={joinedCommunityIds.has(community.id)}
                      loading={communityActionLoadingId === community.id}
                      onOpen={() => setSelectedCommunityId(community.id)}
                      onJoin={() => void onJoinCommunity(community.id)}
                      onLeave={() => void onLeaveCommunity(community.id)}
                    />
                  ))
                )}
              </div>
            )}

            {activeScreen === "events" && (
              <div className="space-y-4">
                <SmallSection title={t.app.eventsTitle} text={t.app.eventsText} />
                <div className="flex items-center gap-2">
                  <SegmentedPill
                    active={eventFeedTab === "upcoming"}
                    label={isRuLocale ? "РЎРєРѕСЂРѕ" : "Upcoming"}
                    onClick={() => setEventFeedTab("upcoming")}
                  />
                  <SegmentedPill
                    active={eventFeedTab === "mine"}
                    label={isRuLocale ? "РњРѕРё СЃРѕР±С‹С‚РёСЏ" : "Meine Events"}
                    onClick={() => setEventFeedTab("mine")}
                  />
                  <button
                    onClick={() => setScreen("communities")}
                    className="ml-auto rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-white"
                  >
                    {isRuLocale ? "РЎРѕРѕР±С‰РµСЃС‚РІР°" : "Communities"}
                  </button>
                </div>
                {eventLoadMessage && <InlineNote text={eventLoadMessage} tone="warning" />}
                {shouldShowEventsLoading ? (
                  <div className="space-y-4">
                    <LoadingCard lines={4} />
                    <LoadingCard lines={4} />
                  </div>
                ) : selectedEvent ? (
                  <EventDetailCard
                    locale={isRuLocale ? "ru" : "de"}
                    event={selectedEvent}
                    communityName={
                      selectedEvent.community_id
                        ? communities.find((community) => community.id === selectedEvent.community_id)?.name ?? null
                        : null
                    }
                    attendeeCount={rsvpCountByEventId.get(selectedEvent.id) ?? 0}
                    myStatus={myEventRsvpByEventId.get(selectedEvent.id)?.status ?? null}
                    loading={eventActionLoadingId === selectedEvent.id}
                    onBack={() => setSelectedEventId(null)}
                    onAttend={() => void onRsvpEvent(selectedEvent.id)}
                    onCancel={() => void onCancelRsvp(selectedEvent.id)}
                  />
                ) : (eventFeedTab === "upcoming" ? futureEventRows : myEventRows).length === 0 ? (
                  <EmptyMobileCard
                    title={eventFeedTab === "upcoming"
                      ? isRuLocale ? "РџРѕРєР° РЅРµС‚ СЃРѕР±С‹С‚РёР№" : "Noch keine Events"
                      : isRuLocale ? "РЈ РІР°СЃ РїРѕРєР° РЅРµС‚ Р·Р°РїРёСЃРµР№" : "Du hast noch keine Zusagen"}
                    text={
                      eventFeedTab === "upcoming"
                        ? isRuLocale
                          ? "Скоро здесь появятся ближайшие встречи Riwvel. Как только события будут опубликованы, вы увидите их в этой ленте."
                          : "Hier erscheinen bald die nächsten Riwvel-Events. Sobald neue Termine veröffentlicht sind, siehst du sie in diesem Feed."
                        : isRuLocale
                          ? "У вас пока нет присоединённых событий. Запишитесь на ближайшую встречу, и она появится в этом разделе."
                          : "Du hast noch keine zugesagten Events. Melde dich für ein Treffen an, dann erscheint es hier."
                    }
                  />
                ) : (
                  (eventFeedTab === "upcoming" ? futureEventRows : myEventRows).map((eventRow) => (
                    <EventListCard
                      key={eventRow.id}
                      locale={isRuLocale ? "ru" : "de"}
                      event={eventRow}
                      communityName={
                        eventRow.community_id
                          ? communities.find((community) => community.id === eventRow.community_id)?.name ?? null
                          : null
                      }
                      attendeeCount={rsvpCountByEventId.get(eventRow.id) ?? 0}
                      myStatus={myEventRsvpByEventId.get(eventRow.id)?.status ?? null}
                      loading={eventActionLoadingId === eventRow.id}
                      onOpen={() => setSelectedEventId(eventRow.id)}
                      onAttend={() => void onRsvpEvent(eventRow.id)}
                      onCancel={() => void onCancelRsvp(eventRow.id)}
                    />
                  ))
                )}
              </div>
            )}

            {activeScreen === "contacts" && (
              <div className="space-y-4">
                <SmallSection
                  title={isRuLocale ? "Р§Р°С‚С‹" : "Chats"}
                  text={
                    isRuLocale
                      ? "Р—РґРµСЃСЊ РІРёРґРЅС‹ РїРѕРґС‚РІРµСЂР¶РґС‘РЅРЅС‹Рµ Р·РЅР°РєРѕРјСЃС‚РІР° Рё РїРѕСЃР»РµРґРЅРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ."
                      : "Hier siehst du bestГ¤tigte Kontakte und die letzten Nachrichten."
                  }
                />
                <div className="flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {isRuLocale ? "Р—Р°РїСЂРѕСЃС‹ РЅР° Р·РЅР°РєРѕРјСЃС‚РІРѕ" : "Kontaktanfragen"}
                    </p>
                    <p className="mt-1 text-xs text-[#8A94A6]">
                      {isRuLocale
                        ? "РќРѕРІС‹Рµ РІС…РѕРґСЏС‰РёРµ РїСЂРёРіР»Р°С€РµРЅРёСЏ Р¶РґСѓС‚ РІР°С€РµРіРѕ СЂРµС€РµРЅРёСЏ."
                        : "Neue eingehende Einladungen warten auf deine Entscheidung."}
                    </p>
                  </div>
                  <button
                    onClick={onOpenRequests}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white"
                  >
                    <span>{isRuLocale ? "РћС‚РєСЂС‹С‚СЊ" : "Г–ffnen"}</span>
                    {currentIncomingRequestCount > 0 && (
                      <span className="rounded-full bg-[#007AFF] px-2 py-0.5 text-[10px] font-semibold text-white">
                        {currentIncomingRequestCount}
                      </span>
                    )}
                  </button>
                </div>
                {shouldShowChatsLoading ? (
                  <LoadingCard lines={3} />
                ) : chatThreads.length === 0 ? (
                  <EmptyMobileCard
                    title={isRuLocale ? "РџРѕРєР° РЅРµС‚ Р·РЅР°РєРѕРјСЃС‚РІ." : "Noch keine Bekanntschaften."}
                    text={
                      isRuLocale
                        ? "РџРѕР·РЅР°РєРѕРјСЊС‚РµСЃСЊ СЃ Р»СЋРґСЊРјРё РІРѕ РІРєР»Р°РґРєРµ В«Р›СЋРґРёВ»."
                        : "Lerne Menschen im Bereich вЂћMenschenвЂњ kennen."
                    }
                  />
                ) : (
                  chatThreads.map((thread) => (
                    <ChatThreadRow
                      key={thread.partner.userId ?? thread.partner.id}
                      person={thread.partner}
                      lastMessage={thread.lastMessage}
                      time={formatRequestDate(isRuLocale ? "ru" : "de", thread.lastActivityAt)}
                      unreadCount={thread.unreadCount}
                      onClick={() => {
                        if (thread.partner.userId) {
                          void onOpenChat(thread.partner.userId);
                        }
                      }}
                    />
                  ))
                )}
              </div>
            )}

            {activeScreen === "requests" && (
              <div className="space-y-4">
                <SmallSection
                  title={isRuLocale ? "Р—Р°РїСЂРѕСЃС‹" : "Anfragen"}
                  text={
                    isRuLocale
                      ? "Р—РґРµСЃСЊ РїРѕСЏРІР»СЏСЋС‚СЃСЏ РЅРѕРІС‹Рµ РїСЂРёРіР»Р°С€РµРЅРёСЏ РЅР° Р·РЅР°РєРѕРјСЃС‚РІРѕ РѕС‚ РґСЂСѓРіРёС… СѓС‡Р°СЃС‚РЅРёРєРѕРІ."
                      : "Hier erscheinen neue Einladungen anderer Mitglieder."
                  }
                />
                {requestsLoading && <InlineNote text={isRuLocale ? "Р—Р°РїСЂРѕСЃС‹ Р·Р°РіСЂСѓР¶Р°СЋС‚СЃСЏ..." : "Anfragen werden geladen..."} />}
                {requestsMessage && <InlineNote text={requestsMessage} tone="warning" />}
                {!requestsLoading && incomingRequests.length === 0 && (
                  <EmptyMobileCard
                    title={isRuLocale ? "РџРѕРєР° РЅРµС‚ РЅРѕРІС‹С… Р·Р°РїСЂРѕСЃРѕРІ" : "Noch keine neuen Anfragen"}
                    text={
                      isRuLocale
                        ? "РљР°Рє С‚РѕР»СЊРєРѕ РєС‚Рѕ-С‚Рѕ Р·Р°С…РѕС‡РµС‚ РїРѕР·РЅР°РєРѕРјРёС‚СЊСЃСЏ, Р·Р°РїСЂРѕСЃ РїРѕСЏРІРёС‚СЃСЏ Р·РґРµСЃСЊ."
                        : "Sobald jemand dich kennenlernen mГ¶chte, erscheint die Anfrage hier."
                    }
                  />
                )}
                {incomingRequests.map((request) => {
                  const requestPerson = requestPeople.find((person) => person.userId === request.from_user_id);

                  if (!requestPerson) {
                    return null;
                  }

                  return (
                    <RequestInboxCard
                      key={request.id}
                      person={requestPerson}
                      message={request.message}
                      date={formatRequestDate(isRuLocale ? "ru" : "de", request.created_at)}
                      acceptLabel={isRuLocale ? "вњ… РџСЂРёРЅСЏС‚СЊ" : "вњ… Annehmen"}
                      declineLabel={isRuLocale ? "вќЊ РћС‚РєР»РѕРЅРёС‚СЊ" : "вќЊ Ablehnen"}
                      onAccept={() => void onUpdateConnectionRequestStatus(request.id, "accepted")}
                      onDecline={() => void onUpdateConnectionRequestStatus(request.id, "declined")}
                    />
                  );
                })}
              </div>
            )}

            {activeScreen === "chat" && (
              <div className="space-y-4">
                <SmallSection
                  title={chatPartner?.name ?? (isRuLocale ? "Р§Р°С‚" : "Chat")}
                  text={
                    chatPartner
                      ? `${chatPartner.city} вЂў ${chatPartner.profession}`
                      : isRuLocale
                        ? "РћС‚РєСЂРѕР№С‚Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅРЅС‹Р№ РєРѕРЅС‚Р°РєС‚, С‡С‚РѕР±С‹ РЅР°С‡Р°С‚СЊ РґРёР°Р»РѕРі."
                        : "Г–ffne einen bestГ¤tigten Kontakt, um den Dialog zu starten."
                  }
                />
                {!chatPartner ? (
                  <EmptyMobileCard
                    title={isRuLocale ? "РљРѕРЅС‚Р°РєС‚ РЅРµ РЅР°Р№РґРµРЅ" : "Kontakt nicht gefunden"}
                    text={
                      isRuLocale
                        ? "Р’РµСЂРЅРёС‚РµСЃСЊ РІ РєРѕРЅС‚Р°РєС‚С‹ Рё РѕС‚РєСЂРѕР№С‚Рµ С‡Р°С‚ Р·Р°РЅРѕРІРѕ."
                        : "Gehe zurГјck zu den Kontakten und Г¶ffne den Chat erneut."
                    }
                  />
                ) : (
                  <ChatCard
                    locale={isRuLocale ? "ru" : "de"}
                    currentUserId={authUser?.id ?? ""}
                    partner={chatPartner}
                    messages={chatMessages}
                    message={chatMessage}
                    setMessage={setChatMessage}
                    loading={chatLoading}
                    feedback={chatFeedback}
                    bottomRef={chatBottomRef}
                    onBack={() => setScreen("contacts")}
                    onSend={() => void onSendChatMessage()}
                  />
                )}
              </div>
            )}

            {activeScreen === "profile" && (
              <div className="space-y-4">
                <SmallSection title={t.app.profileTitle} text={t.app.profileText} />

                {!isProfileReadyToRender && <LoadingCard lines={4} />}

                {isProfileReadyToRender && supabaseConfigured && authUser && !hasProfile && (
                  <InlineNote
                    text={
                      isRuLocale
                        ? "РЎРЅР°С‡Р°Р»Р° Р·Р°РїРѕР»РЅРёС‚Рµ РїСЂРѕС„РёР»СЊ. РџРѕСЃР»Рµ СЌС‚РѕРіРѕ РІС‹ СЃСЂР°Р·Сѓ СѓРІРёРґРёС‚Рµ Р»СЋРґРµР№ Рё С‡Р°С‚С‹."
                        : "FГјlle zuerst dein Profil aus. Danach siehst du sofort Menschen und Chats."
                    }
                    tone="info"
                  />
                )}

                {isProfileReadyToRender && !supabaseConfigured && (
                  <InfoBanner
                    title={isRuLocale ? "РџРѕРґРєР»СЋС‡РµРЅРёРµ РґР°РЅРЅС‹С…" : "Datenverbindung"}
                    text={
                      isRuLocale
                        ? "РџР»Р°С‚С„РѕСЂРјР° РµС‰С‘ РїРѕРґРєР»СЋС‡Р°РµС‚СЃСЏ Рє РґР°РЅРЅС‹Рј. РќРѕ РїСЂРѕС„РёР»СЊ СѓР¶Рµ РјРѕР¶РЅРѕ РїРѕРґРіРѕС‚РѕРІРёС‚СЊ."
                        : "Die Community-Daten werden noch verbunden. Du kannst dein Profil aber schon vorbereiten."
                    }
                  />
                )}

                {isProfileReadyToRender && authUser && (
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-[24px]">
                    <div className="rounded-[20px] border border-[#007AFF]/20 bg-[#007AFF]/10 px-4 py-3 text-sm text-[#D8E6FF]">
                      {social.loggedInAs}: {authUser.email}
                    </div>
                  </div>
                )}

                {isProfileReadyToRender && (
                  <>
                    <div className="grid gap-3">
                      <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-[24px]">
                        <label className="mb-3 block text-sm font-medium text-white">
                          {t.app.profilePhoto}
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
                            {profilePhotoPreview || profileForm.photoUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={profilePhotoPreview || profileForm.photoUrl}
                                alt={t.app.profilePhotoAlt}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getInitials(profileForm.name || authUser?.email?.split("@")[0] || "Neu Start")
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <button
                              type="button"
                              onClick={() => avatarInputRef.current?.click()}
                              className="w-full rounded-[20px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white"
                            >
                                {avatarUploading
                                  ? isRuLocale
                                  ? "Р—Р°РіСЂСѓР·РєР° С„РѕС‚Рѕ..."
                                  : "Foto wird hochgeladen..."
                                : isRuLocale
                                  ? "Р’С‹Р±СЂР°С‚СЊ С„РѕС‚Рѕ"
                                  : "Foto auswГ¤hlen"}
                            </button>
                            <input
                              ref={avatarInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(event) => void onAvatarUpload(event)}
                              className="hidden"
                            />
                            <p className="text-xs leading-6 text-[#8A94A6]">
                              {isRuLocale
                                ? "Р¤РѕС‚Рѕ Р·Р°РіСЂСѓР¶Р°РµС‚СЃСЏ РІ Р·Р°С‰РёС‰С‘РЅРЅРѕРµ С…СЂР°РЅРёР»РёС‰Рµ NeuStart. Р•СЃР»Рё Р·Р°РіСЂСѓР·РєР° РЅРµ СЃСЂР°Р±РѕС‚Р°РµС‚, РїСЂРѕС„РёР»СЊ РІСЃС‘ СЂР°РІРЅРѕ РјРѕР¶РЅРѕ СЃРѕС…СЂР°РЅРёС‚СЊ."
                                : "Das Foto wird in den geschГјtzten NeuStart-Speicher geladen. Falls der Upload fehlschlГ¤gt, kannst du dein Profil trotzdem speichern."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <MobileField
                        label={t.app.profileFields.name}
                        placeholder={t.app.profilePlaceholders.name}
                        value={profileForm.name}
                        onChange={(value) => setProfileForm((current) => ({ ...current, name: value }))}
                      />
                      <MobileField
                        label={t.app.profileFields.city}
                        placeholder={t.app.profilePlaceholders.city}
                        value={profileForm.city}
                        onChange={(value) => setProfileForm((current) => ({ ...current, city: value }))}
                      />
                      <MobileField
                        label={t.app.profileFields.origin}
                        placeholder={social.languagesPlaceholder}
                        value={profileForm.languages}
                        onChange={(value) =>
                          setProfileForm((current) => ({ ...current, languages: value }))
                        }
                      />
                      <MobileField
                        label={t.app.interestsTitle}
                        placeholder={social.interestsPlaceholder}
                        value={profileForm.interests}
                        onChange={(value) =>
                          setProfileForm((current) => ({ ...current, interests: value }))
                        }
                      />
                      <MobileField
                        label={t.app.lookingForTitle}
                        placeholder={social.lookingForPlaceholder}
                        value={profileForm.lookingFor}
                        onChange={(value) =>
                          setProfileForm((current) => ({ ...current, lookingFor: value }))
                        }
                      />
                    </div>

                    <textarea
                      className="min-h-28 w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
                      placeholder={t.app.profileFields.about}
                      value={profileForm.about}
                      onChange={(event) =>
                        setProfileForm((current) => ({ ...current, about: event.target.value }))
                      }
                    />

                    <p className="text-xs leading-6 text-[#8A94A6]">{social.profileHelp}</p>

                    <TagCloud
                      title={t.app.interestsTitle}
                      tags={appProfileTags.interests}
                      onSelect={(tag) =>
                        setProfileForm((current) => ({
                          ...current,
                          interests: appendTag(current.interests, tag),
                        }))
                      }
                    />
                    <TagCloud
                      title={t.app.lookingForTitle}
                      tags={appProfileTags.lookingFor}
                      onSelect={(tag) =>
                        setProfileForm((current) => ({
                          ...current,
                          lookingFor: appendTag(current.lookingFor, tag),
                        }))
                      }
                    />

                    {profileMessage && <InlineNote text={profileMessage} tone="info" />}

                    <button
                      onClick={() => void onSaveProfile()}
                      disabled={!canSaveProfile}
                      className="w-full rounded-[20px] bg-[#007AFF] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {profileSaving ? "..." : isRuLocale ? "РЎРѕС…СЂР°РЅРёС‚СЊ РїСЂРѕС„РёР»СЊ" : "Profil speichern"}
                    </button>
                  </>
                )}
              </div>
            )}

            {activeScreen === "services" && (
              <div className="space-y-4">
                <SmallSection title={t.app.servicesTitle} text={t.app.servicesText} />
                {partners.map((partner) => (
                  <PartnerOfferCard
                    key={partner.title}
                    title={partner.title}
                    category={partner.category}
                    description={partner.description}
                    offer={partner.offer}
                  />
                ))}
              </div>
            )}

            <div className="mt-4 rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#007AFF]">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{t.app.aiTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#C7D1E0]">{t.app.aiText}</p>
                  <div className="mt-3 space-y-2">
                    {t.app.aiBullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-sm text-[#D3DCE8]">
                        <span className="h-2 w-2 rounded-full bg-[#007AFF]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="fixed inset-x-4 bottom-[calc(14px+env(safe-area-inset-bottom))] z-40 mx-auto max-w-[430px] rounded-[24px] border border-white/10 bg-[rgba(10,16,30,0.9)] p-2 shadow-[0_24px_80px_-36px_rgba(0,0,0,1)] backdrop-blur-[28px]">
            <div className="grid grid-cols-5 gap-1">
              {mobileNav.map((item) => (
                <MobileNavButton
                  key={item.key}
                  label={navLabels[item.key]}
                  icon={item.icon}
                  active={activeNavScreen === item.screen}
                  badgeCount={item.key === "chats" ? unreadChatCount : 0}
                  onClick={() => setScreen(item.screen)}
                />
              ))}
            </div>
          </nav>
        </div>

        {!standalone && selectedPerson ? (
          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-[#95A6BE]">
            {t.app.profileCardTitle}: {selectedPerson.name}, {selectedPerson.city},{" "}
            {t.profileStatus.toLowerCase()} {selectedPerson.status.toLowerCase()}.
          </div>
        ) : !standalone ? (
          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-[#95A6BE]">
            {social.noProfilesText}
          </div>
        ) : null}
      </div>

      {requestModalPerson && (
        <ConnectionRequestModal
          locale={isRuLocale ? "ru" : "de"}
          person={requestModalPerson}
          message={requestDraft}
          setMessage={setRequestDraft}
          mode={requestModalMode}
          loading={requestSending}
          feedback={requestsMessage}
          onClose={onCloseConnectionRequest}
          onSend={() => void onSendConnectionRequest()}
        />
      )}
    </div>
  );
}

function SegmentedPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
        active ? "bg-[#007AFF] text-white" : "border border-white/10 bg-white/[0.05] text-[#C7D1E0]"
      }`}
    >
      {label}
    </button>
  );
}

function CommunityListCard({
  locale,
  community,
  memberCount,
  joined,
  loading,
  onOpen,
  onJoin,
  onLeave,
}: {
  locale: Locale;
  community: CommunityRow;
  memberCount: number;
  joined: boolean;
  loading: boolean;
  onOpen: () => void;
  onJoin: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-[24px]">
      <button onClick={onOpen} className="w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-white">{community.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8FA8D6]">
              {[community.city, community.language, community.category].filter(Boolean).join(" вЂў ")}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#C7D1E0]">
            {memberCount} {locale === "ru" ? "СѓС‡Р°СЃС‚." : "Mitgl."}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{community.description || " "}</p>
      </button>
      <button
        onClick={joined ? onLeave : onJoin}
        disabled={loading}
        className={`mt-4 w-full rounded-[20px] px-4 py-3 text-sm font-medium transition-colors ${
          joined ? "border border-white/10 bg-white/[0.05] text-white" : "bg-[#007AFF] text-white"
        }`}
      >
        {loading
          ? locale === "ru"
            ? "РЎРѕС…СЂР°РЅСЏРµРј..."
            : "Speichern..."
          : joined
            ? locale === "ru"
              ? "Покинуть"
              : "Verlassen"
            : locale === "ru"
              ? "Вступить"
              : "Beitreten"}
      </button>
    </div>
  );
}

function CommunityDetailCard({
  locale,
  community,
  memberCount,
  joined,
  loading,
  onBack,
  onJoin,
  onLeave,
}: {
  locale: Locale;
  community: CommunityRow;
  memberCount: number;
  joined: boolean;
  loading: boolean;
  onBack: () => void;
  onJoin: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-[#8FA8D6]">
        {locale === "ru" ? "РќР°Р·Р°Рґ Рє СЃРѕРѕР±С‰РµСЃС‚РІР°Рј" : "ZurГјck zu den Communities"}
      </button>
      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-[24px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8FA8D6]">
          {[community.city, community.language, community.category].filter(Boolean).join(" вЂў ")}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{community.name}</h3>
        <p className="mt-4 text-sm leading-7 text-[#C7D1E0]">{community.description || " "}</p>
        <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#D3DCE8]">
          {locale === "ru" ? "РЈС‡Р°СЃС‚РЅРёРєРѕРІ" : "Mitglieder"}: {memberCount}
        </div>
        {memberCount === 0 ? (
          <p className="mt-3 text-sm text-[#8A94A6]">
            {locale === "ru"
              ? "РџРѕРєР° РІ СЌС‚РѕРј СЃРѕРѕР±С‰РµСЃС‚РІРµ РЅРµС‚ СѓС‡Р°СЃС‚РЅРёРєРѕРІ. Р’С‹ РјРѕР¶РµС‚Рµ РїСЂРёСЃРѕРµРґРёРЅРёС‚СЊСЃСЏ РїРµСЂРІС‹Рј."
              : "Noch keine Mitglieder in dieser Community. Du kannst als Erste:r beitreten."}
          </p>
        ) : null}
        <button
          onClick={joined ? onLeave : onJoin}
          disabled={loading}
          className={`mt-4 w-full rounded-[20px] px-4 py-3 text-sm font-medium ${
            joined ? "border border-white/10 bg-white/[0.05] text-white" : "bg-[#007AFF] text-white"
          }`}
        >
          {loading
            ? locale === "ru"
              ? "РЎРѕС…СЂР°РЅСЏРµРј..."
              : "Speichern..."
            : joined
              ? locale === "ru"
                ? "РџРѕРєРёРЅСѓС‚СЊ СЃРѕРѕР±С‰РµСЃС‚РІРѕ"
                : "Community verlassen"
              : locale === "ru"
                ? "Р’СЃС‚СѓРїРёС‚СЊ РІ СЃРѕРѕР±С‰РµСЃС‚РІРѕ"
                : "Community beitreten"}
        </button>
      </div>
    </div>
  );
}

function EventListCard({
  locale,
  event,
  communityName,
  attendeeCount,
  myStatus,
  loading,
  onOpen,
  onAttend,
  onCancel,
}: {
  locale: Locale;
  event: EventRow;
  communityName: string | null;
  attendeeCount: number;
  myStatus: string | null;
  loading: boolean;
  onOpen: () => void;
  onAttend: () => void;
  onCancel: () => void;
}) {
  const isGoing = myStatus === "going" || myStatus === "maybe";

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-[24px]">
      <button onClick={onOpen} className="block w-full text-left">
        <div className="h-32 bg-[linear-gradient(135deg,rgba(0,122,255,0.35),rgba(99,102,241,0.18),rgba(255,255,255,0.06))]" />
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-white">{event.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8FA8D6]">
                {[event.category, event.language].filter(Boolean).join(" вЂў ")}
              </p>
            </div>
            {communityName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#C7D1E0]">
                {communityName}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-[#D3DCE8]">{formatEventDateRange(locale, event.starts_at, event.ends_at)}</p>
          <p className="text-sm text-[#C7D1E0]">{formatEventLocation(locale, event.city, event.address, event.online_url)}</p>
          {event.organizer ? (
            <p className="text-sm text-[#C7D1E0]">
              {locale === "ru" ? "РћСЂРіР°РЅРёР·Р°С‚РѕСЂ" : "Organisiert von"}: {event.organizer}
            </p>
          ) : null}
          <p className="text-sm leading-6 text-[#A8B6CB]">{event.description || " "}</p>
          <p className="text-xs text-[#8A94A6]">
            {locale === "ru" ? "РЈС‡Р°СЃС‚РЅРёРєРѕРІ" : "Teilnehmende"}: {attendeeCount}
            {event.capacity ? ` / ${event.capacity}` : ""}
          </p>
        </div>
      </button>
      <div className="space-y-2 px-4 pb-4">
        <button
          onClick={isGoing ? onOpen : onAttend}
          disabled={loading}
          className={`w-full rounded-[20px] px-4 py-3 text-sm font-medium ${
            isGoing ? "border border-white/10 bg-white/[0.05] text-white" : "bg-[#007AFF] text-white"
          }`}
        >
          {loading
            ? locale === "ru"
              ? "РЎРѕС…СЂР°РЅСЏРµРј..."
              : "Speichern..."
            : isGoing
              ? locale === "ru"
                ? "Р’С‹ РёРґС‘С‚Рµ"
                : "Du gehst hin"
              : locale === "ru"
                ? "РЇ РёРґСѓ"
                : "Ich gehe hin"}
        </button>
        {isGoing ? (
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full rounded-[20px] border border-white/10 bg-transparent px-4 py-3 text-sm font-medium text-[#C7D1E0]"
          >
            {locale === "ru" ? "РћС‚РјРµРЅРёС‚СЊ" : "Absagen"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EventDetailCard({
  locale,
  event,
  communityName,
  attendeeCount,
  myStatus,
  loading,
  onBack,
  onAttend,
  onCancel,
}: {
  locale: Locale;
  event: EventRow;
  communityName: string | null;
  attendeeCount: number;
  myStatus: string | null;
  loading: boolean;
  onBack: () => void;
  onAttend: () => void;
  onCancel: () => void;
}) {
  const isGoing = myStatus === "going" || myStatus === "maybe";

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-[#8FA8D6]">
        {locale === "ru" ? "РќР°Р·Р°Рґ Рє СЃРѕР±С‹С‚РёСЏРј" : "ZurГјck zu den Events"}
      </button>
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-[24px]">
        <div className="h-40 bg-[linear-gradient(135deg,rgba(0,122,255,0.38),rgba(99,102,241,0.2),rgba(255,255,255,0.06))]" />
        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8FA8D6]">
                {[event.category, event.language].filter(Boolean).join(" вЂў ")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{event.title}</h3>
            </div>
            {communityName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#C7D1E0]">
                {communityName}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-[#D3DCE8]">{formatEventDateRange(locale, event.starts_at, event.ends_at)}</p>
          <p className="text-sm text-[#D3DCE8]">{formatEventLocation(locale, event.city, event.address, event.online_url)}</p>
          {event.organizer ? (
            <p className="text-sm text-[#D3DCE8]">
              {locale === "ru" ? "РћСЂРіР°РЅРёР·Р°С‚РѕСЂ" : "Organisiert von"}: {event.organizer}
            </p>
          ) : null}
          {event.online_url ? (
            <a
              href={event.online_url}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-[#8FA8D6] underline decoration-white/20 underline-offset-4"
            >
              {event.online_url}
            </a>
          ) : null}
          <p className="text-sm leading-7 text-[#C7D1E0]">{event.description || " "}</p>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#D3DCE8]">
            {locale === "ru" ? "РЈС‡Р°СЃС‚РЅРёРєРѕРІ" : "Teilnehmende"}: {attendeeCount}
            {event.capacity ? ` / ${event.capacity}` : ""}
          </div>
          {attendeeCount === 0 ? (
            <p className="text-sm text-[#8A94A6]">
              {locale === "ru"
                ? "РџРѕРєР° РЅРёРєС‚Рѕ РЅРµ Р·Р°РїРёСЃР°Р»СЃСЏ. Р’С‹ РјРѕР¶РµС‚Рµ СЃС‚Р°С‚СЊ РїРµСЂРІС‹Рј СѓС‡Р°СЃС‚РЅРёРєРѕРј."
                : "Noch keine Teilnehmenden. Du kannst die erste Zusage geben."}
            </p>
          ) : null}
          <div className="space-y-2">
            <button
              onClick={isGoing ? onBack : onAttend}
              disabled={loading}
              className={`w-full rounded-[20px] px-4 py-3 text-sm font-medium ${
                isGoing ? "border border-white/10 bg-white/[0.05] text-white" : "bg-[#007AFF] text-white"
              }`}
            >
              {loading
                ? locale === "ru"
                  ? "РЎРѕС…СЂР°РЅСЏРµРј..."
                  : "Speichern..."
                : isGoing
                  ? locale === "ru"
                    ? "Р’С‹ РёРґС‘С‚Рµ"
                    : "Du gehst hin"
                  : locale === "ru"
                    ? "РЇ РёРґСѓ"
                    : "Ich gehe hin"}
            </button>
            {isGoing ? (
              <button
                onClick={onCancel}
                disabled={loading}
                className="w-full rounded-[20px] border border-white/10 bg-transparent px-4 py-3 text-sm font-medium text-[#C7D1E0]"
              >
                {locale === "ru" ? "РћС‚РјРµРЅРёС‚СЊ" : "Absagen"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function FounderDashboard({
  t,
  locale,
  founderMetrics,
  founderFunnel,
  founderCharts,
  communityPipeline,
  revenueCards,
}: {
  t: (typeof translations)[Locale];
  locale: Locale;
  founderMetrics: (typeof founderMetricsByLocale)[Locale];
  founderFunnel: (typeof founderFunnelByLocale)[Locale];
  founderCharts: (typeof founderChartsByLocale)[Locale];
  communityPipeline: (typeof communityPipelineByLocale)[Locale];
  revenueCards: (typeof revenueCardsByLocale)[Locale];
}) {
  return (
    <div className="space-y-6 lg:space-y-8">
      <SectionIntro badge={t.founder.badge} title={t.founder.title} text={t.founder.text} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {founderMetrics.map((metric) => (
          <MetricCard key={metric.label} value={metric.value} label={metric.label} delta={metric.delta} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title={t.founder.chartTitle} points={founderCharts} />
        <PanelCard title={t.founder.funnelTitle}>
          <div className="space-y-3">
            {founderFunnel.map((stage) => (
              <FunnelBar
                key={stage.title}
                title={stage.title}
                value={stage.value}
                percentage={stage.percentage}
              />
            ))}
          </div>
        </PanelCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <PanelCard title={t.founder.revenueTitle}>
          <div className="space-y-3">
            {revenueCards.map((card) => (
              <PipelineBox key={card.title} title={card.title} value={card.tag} note={card.text} />
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t.founder.roadmapTitle}>
          <div className="space-y-3">
            {communityPipeline.map((item) => (
              <PipelineBox key={item.title} title={item.title} value={item.value} note={item.note} />
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard title={t.founder.notesTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {founderInsightNotes[locale].map((note) => (
            <InsightNote key={note.title} title={note.title} text={note.text} />
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

function AdminDashboard({
  t,
  locale,
  adminMetrics,
  people,
  events,
  adminOffers,
  moderationQueue,
}: {
  t: (typeof translations)[Locale];
  locale: Locale;
  adminMetrics: (typeof adminMetricsByLocale)[Locale];
  people: Person[];
  events: (typeof eventsByLocale)[Locale];
  adminOffers: (typeof adminOffersByLocale)[Locale];
  moderationQueue: (typeof moderationQueueByLocale)[Locale];
}) {
  return (
    <div className="space-y-6 lg:space-y-8">
      <SectionIntro badge={t.admin.badge} title={t.admin.title} text={t.admin.text} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} value={metric.value} label={metric.label} delta={metric.delta} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <PanelCard title={t.admin.membersTitle}>
          <div className="space-y-3">
            {people.map((person) => (
              <MemberRow key={person.id} person={person} profileStatusLabel={t.profileStatus} />
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t.admin.healthTitle}>
          <HealthPanel locale={locale} />
        </PanelCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <PanelCard title={t.admin.eventsTitle}>
          <div className="space-y-3">
            {events.map((event) => (
              <MiniEventRow
                key={event.title}
                title={event.title}
                meta={`${event.city} вЂў ${event.date}`}
                seatsLeft={event.seatsLeft}
              />
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t.admin.matchesTitle}>
          <div className="space-y-3">
            {people.slice(0, 4).map((person) => (
              <QueueBox
                key={person.id}
                title={person.name}
                meta={`${person.city} вЂў ${person.profession}`}
                note={person.reason}
              />
            ))}
          </div>
        </PanelCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <PanelCard title={t.admin.offersTitle}>
          <div className="space-y-3">
            {adminOffers.map((offer) => (
              <OfferRow
                key={offer.title}
                title={offer.title}
                status={offer.status}
                value={offer.value}
              />
            ))}
          </div>
        </PanelCard>

        <PanelCard title={t.admin.moderationTitle}>
          <div className="space-y-3">
            {moderationQueue.map((item) => (
              <ModerationRow
                key={item.title}
                title={item.title}
                priority={item.priority}
                note={item.note}
              />
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function BackgroundAura() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-[14%] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#0D7CFF]/18 blur-[140px] motion-safe:animate-[floatBlob_12s_ease-in-out_infinite]" />
      <div className="absolute right-[8%] top-[120px] h-[320px] w-[320px] rounded-full bg-cyan-300/10 blur-[140px] motion-safe:animate-[floatBlob_16s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[8%] left-[46%] h-[420px] w-[420px] rounded-full bg-blue-500/14 blur-[170px] motion-safe:animate-[floatBlob_18s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
    </div>
  );
}

function TopTab({
  label,
  active,
  icon: Icon,
  onClick,
}: {
  label: string;
  active: boolean;
  icon: IconType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300 ${
        active
          ? "border-[#007AFF]/30 bg-[#007AFF]/12 text-white shadow-[0_0_24px_rgba(0,122,255,0.18)]"
          : "border-white/10 bg-white/[0.04] text-[#A8B6CB] hover:-translate-y-[1px] hover:text-white"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function SectionIntro({
  badge,
  title,
  text,
}: {
  badge: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8EC5FF]">
        {badge}
      </span>
      <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.06em] text-white sm:text-[2.5rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8A94A6] sm:text-[15px]">
        {text}
      </p>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.05] shadow-[0_40px_110px_-60px_rgba(0,0,0,1)] backdrop-blur-[26px] ${className}`}>
      {children}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function HeroWebsite({
  badge,
  title,
  text,
  note,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  badge: string;
  title: string;
  text: string;
  note: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <GlassCard className="overflow-hidden bg-[linear-gradient(135deg,rgba(10,17,34,0.98),rgba(11,32,67,0.86)_52%,rgba(0,122,255,0.62))] p-6 sm:p-8">
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8E6FF]">
          {badge}
        </span>
        <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.97] tracking-[-0.07em] text-white sm:text-[3.7rem]">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#D8E6FF] sm:text-[15px]">{text}</p>
        <p className="mt-4 max-w-[45ch] text-sm leading-7 text-[#BFD5F7]">{note}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={onPrimary}
            className="rounded-[18px] bg-white px-5 py-3 text-sm font-medium text-[#06101E] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.45)]"
          >
            {primaryLabel}
          </button>
          <button
            onClick={onSecondary}
            className="rounded-[18px] border border-white/10 bg-white/[0.12] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/[0.18]"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function CommunityVisual({ people }: { people: Person[] }) {
  return (
    <GlassCard className="relative overflow-hidden p-6">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#0D7CFF]/16 blur-[90px]" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-300/8 blur-[90px]" />

      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <FloatingCard delayClass="motion-safe:animate-[floatCard_8s_ease-in-out_infinite]">
            <AvatarCluster names={people.slice(0, 3).map((person) => person.name)} />
            <h3 className="mt-4 text-lg font-semibold text-white">Warm intros</h3>
            <p className="mt-2 text-sm leading-6 text-[#C7D1E0]">
              Kleine, vertrauensvolle Verbindungen statt kalter Listen.
            </p>
          </FloatingCard>

          <FloatingCard delayClass="motion-safe:animate-[floatCard_11s_ease-in-out_infinite]">
            <MiniProfilePreview person={people[0]} />
          </FloatingCard>

          <FloatingCard delayClass="motion-safe:animate-[floatCard_10s_ease-in-out_infinite]">
            <MapStyleCard />
          </FloatingCard>

          <FloatingCard delayClass="motion-safe:animate-[floatCard_9s_ease-in-out_infinite]">
            <GradientEventPreview />
          </FloatingCard>
        </div>
      </div>
    </GlassCard>
  );
}

function SectionGrid({
  title,
  text,
  side,
  children,
}: {
  title: string;
  text: string;
  side: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <SectionCard title={title} text={text}>
        {children}
      </SectionCard>
      {side}
    </div>
  );
}

function SectionCard({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard className="p-6 sm:p-7">
      <h3 className="text-[1.65rem] font-semibold tracking-[-0.05em] text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#8A94A6]">{text}</p>
      <div className="mt-5">{children}</div>
    </GlassCard>
  );
}

function EmotionCard({ title, text }: { title: string; text: string }) {
  return (
    <GlassCard className="p-6 sm:p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[#007AFF]/16 text-[#8EC5FF]">
        <HeartHandshake className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-[1.65rem] font-semibold tracking-[-0.05em] text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#C7D1E0]">{text}</p>
      <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm leading-7 text-[#D8E6FF]">
          NeuStart verbindet Menschen nicht nur mit Informationen, sondern mit Zugehorigkeit.
        </p>
      </div>
    </GlassCard>
  );
}

function HumanCard({
  icon: Icon,
  title,
  text,
}: {
  icon: IconType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#007AFF]/12">
        <Icon className="h-5 w-5 text-[#8EC5FF]" />
      </div>
      <h4 className="mt-4 text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-7 text-[#C7D1E0]">{text}</p>
    </div>
  );
}

function FlowPreview({
  people,
  events,
}: {
  people: Person[];
  events: (typeof eventsByLocale)[Locale];
}) {
  return (
    <GlassCard className="p-6 sm:p-7">
      <div className="grid gap-3">
        <FlowCard
          title="1. Profil erstellen"
          subtitle={people[0].name}
          meta={`${people[0].city} вЂў ${people[0].language}`}
        />
        <FlowCard
          title="2. Wochentliche Matches"
          subtitle={people[1].name}
          meta={people[1].reason}
        />
        <FlowCard
          title="3. Veranstaltungen besuchen"
          subtitle={events[0].title}
          meta={`${events[0].city} вЂў ${events[0].date}`}
        />
      </div>
    </GlassCard>
  );
}

function FlowCard({
  title,
  subtitle,
  meta,
}: {
  title: string;
  subtitle: string;
  meta: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8EC5FF]">{title}</p>
      <h4 className="mt-2 text-lg font-semibold text-white">{subtitle}</h4>
      <p className="mt-2 text-sm leading-6 text-[#C7D1E0]">{meta}</p>
    </div>
  );
}

function StepCard({ index, text }: { index: number; text: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007AFF] text-sm font-semibold text-white">
        {index}
      </div>
      <p className="mt-4 text-sm leading-7 text-[#D8E6FF]">{text}</p>
    </div>
  );
}

function CommunityMapCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-4">
      <div className="flex items-center gap-2 text-[#8EC5FF]">
        <MapPinned className="h-4 w-4" />
        <span className="text-sm font-medium text-white">{title}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{subtitle}</p>
    </div>
  );
}

function FounderVisionCard() {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8EC5FF]">Vision</p>
        <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">
          Eine Zukunft, in der neue Ankommende nicht mit Isolation beginnen,
          sondern mit vertrauensvollen Kreisen, lokaler Orientierung und echter Unterstutzung.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <MiniVisionPill label="Soziales Vertrauen" />
        <MiniVisionPill label="Infrastruktur der Gemeinschaft" />
        <MiniVisionPill label="Relevanz der Partner" />
        <MiniVisionPill label="Sanfter Einstieg" />
      </div>
    </div>
  );
}

function MiniVisionPill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-[#C7D1E0]">
      {label}
    </div>
  );
}

function SoftServiceCard({
  title,
  subtitle,
  detail,
  icon: Icon,
  compact = false,
}: {
  title: string;
  subtitle: string;
  detail: string;
  icon: IconType;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06] ${
        compact ? "" : "min-h-[200px]"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#007AFF]/12">
        <Icon className="h-5 w-5 text-[#8EC5FF]" />
      </div>
      <h4 className="mt-4 text-sm font-semibold text-white">{title}</h4>
      <p className="mt-2 text-xs leading-6 text-[#8A94A6]">{subtitle}</p>
      <p className="mt-3 text-xs leading-6 text-[#C7D1E0]">{detail}</p>
    </div>
  );
}

function FinalCtaCard({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <GlassCard className="overflow-hidden bg-[linear-gradient(145deg,rgba(8,13,26,0.96),rgba(14,29,61,0.88)_55%,rgba(0,122,255,0.55))] p-6">
      <h3 className="text-[2rem] font-semibold tracking-[-0.06em] text-white">
        Mit Menschen beginnen, nicht mit Papierkram.
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">
        NeuStart verbindet Zugehorigkeit, Orientierung und vertrauensvolle Unterstutzung in einem sozialen Produkterlebnis.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onPrimary}
          className="rounded-[18px] bg-white px-5 py-3 text-sm font-medium text-[#06101E] transition-all duration-300 hover:-translate-y-[1px]"
        >
          {primaryLabel}
        </button>
        <button
          onClick={onSecondary}
          className="rounded-[18px] border border-white/10 bg-white/[0.12] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-white/[0.18]"
        >
          {secondaryLabel}
        </button>
      </div>
    </GlassCard>
  );
}

function FloatingCard({
  delayClass,
  children,
}: {
  delayClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-[24px] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-[24px] ${delayClass}`}>
      {children}
    </div>
  );
}

function AvatarCluster({ names }: { names: string[] }) {
  return (
    <div>
      <div className="flex -space-x-3">
        {names.map((name) => (
          <div
            key={name}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] text-sm font-semibold text-white"
          >
            {getInitials(name)}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#C7D1E0]">
        Human-first circles that feel friendly from the very first interaction.
      </p>
    </div>
  );
}

function MiniProfilePreview({ person }: { person: Person }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] text-lg font-semibold text-white">
          {getInitials(person.name)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{person.name}</h4>
          <p className="text-xs text-[#8A94A6]">
            {person.city} вЂў {person.language}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#C7D1E0]">{person.reason}</p>
    </div>
  );
}

function MapStyleCard() {
  return (
    <div>
      <div className="flex items-center gap-2 text-[#8EC5FF]">
        <Compass className="h-4 w-4" />
        <span className="text-sm font-medium text-white">Lokale Community-Karte</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-[18px] bg-[#007AFF]/16 p-3 text-center text-xs text-white">Berlin</div>
        <div className="rounded-[18px] bg-white/[0.06] p-3 text-center text-xs text-white">Hamburg</div>
        <div className="rounded-[18px] bg-white/[0.06] p-3 text-center text-xs text-white">NRW</div>
      </div>
    </div>
  );
}

function GradientEventPreview() {
  return (
    <div className="overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(17,28,58,1),rgba(0,122,255,0.45))] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#D8E6FF]">Veranstaltung der Gemeinschaft</p>
      <h4 className="mt-3 text-lg font-semibold text-white">Welcome-Circle-Abend</h4>
      <p className="mt-2 text-sm leading-6 text-[#D8E6FF]">
        Eine atmospharische Vorschaulkarte fur warme lokale Begegnungen.
      </p>
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */

function MobileHeroCard({
  title,
  text,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  title: string;
  text: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,rgba(11,18,36,0.96),rgba(9,30,68,0.86)_52%,rgba(0,122,255,0.72))] p-5 shadow-[0_26px_70px_-40px_rgba(0,122,255,0.75)]">
      <h3 className="text-[1.8rem] font-semibold leading-[1.02] tracking-[-0.06em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">{text}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={onPrimary}
          className="rounded-[18px] bg-white px-4 py-3 text-sm font-medium text-[#06101E]"
        >
          {primaryLabel}
        </button>
        <button
          onClick={onSecondary}
          className="rounded-[18px] border border-white/10 bg-white/[0.12] px-4 py-3 text-sm font-medium text-white"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}

function SmallSection({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#8A94A6]">{text}</p>
    </div>
  );
}

function MobileMatchCard({
  person,
  reasonLabel,
  buttonLabel,
  onClick,
}: {
  person: Person;
  reasonLabel: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-white">{person.name}</h4>
              <p className="text-sm text-[#8A94A6]">{person.city}</p>
            </div>
            <span className="rounded-full border border-[#007AFF]/24 bg-[#007AFF]/12 px-2.5 py-1 text-[11px] font-medium text-[#8EC5FF]">
              {person.language}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">
            {reasonLabel}: {person.reason}
          </p>
          <button
            onClick={onClick}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-4 py-2 text-xs font-medium text-white"
          >
            {buttonLabel}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PeopleDiscoveryCard({
  person,
  languageLabel,
  addLabel,
  addDisabled,
  profileStatusLabel,
  onOpen,
  onAdd,
}: {
  person: Person;
  languageLabel: string;
  addLabel: string;
  addDisabled?: boolean;
  profileStatusLabel: string;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <button onClick={onOpen} className="flex w-full gap-3 text-left">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.06] text-base font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-white">{person.name}</h4>
              <p className="text-sm text-[#8A94A6]">
                {person.city} вЂў {person.profession}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#8EC5FF]">
              {person.language}
            </span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#667894]">
            {profileStatusLabel}: {person.status}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{person.about}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#007AFF]/18 bg-[#007AFF]/10 px-3 py-1 text-xs font-medium text-[#8EC5FF]">
            <Languages className="h-3.5 w-3.5" />
            {languageLabel}: {person.language}
          </div>
        </div>
      </button>
      <button
        onClick={onAdd}
        disabled={addDisabled}
        className="mt-4 rounded-[18px] bg-[#007AFF] px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {addLabel}
      </button>
    </div>
  );
}

function PersonDetailCard({
  person,
  locale,
  languageLabel,
  interestsLabel,
  lookingForLabel,
  aboutLabel,
  backLabel,
  actionLabel,
  actionDisabled,
  onBack,
  onAction,
}: {
  person: Person;
  locale: Locale;
  languageLabel: string;
  interestsLabel: string;
  lookingForLabel: string;
  aboutLabel: string;
  backLabel: string;
  actionLabel: string;
  actionDisabled?: boolean;
  onBack: () => void;
  onAction: () => void;
}) {
  const languages = person.language ? [person.language] : [];

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[#D8E6FF]"
      >
        <ChevronLeft className="h-4 w-4" />
        {backLabel}
      </button>

      <div className="mt-4 flex items-start gap-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06] text-lg font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-white">{person.name}</h3>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#8EC5FF]">
              {person.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#8A94A6]">
            {person.city} вЂў {person.profession}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <DetailInfoRow
          label={languageLabel}
          items={languages}
          fallback={locale === "ru" ? "РќРµ СѓРєР°Р·Р°РЅРѕ" : "Nicht angegeben"}
        />
        <DetailInfoRow
          label={interestsLabel}
          items={person.interests}
          fallback={locale === "ru" ? "РРЅС‚РµСЂРµСЃС‹ РїРѕСЏРІСЏС‚СЃСЏ РїРѕР·Р¶Рµ" : "Interessen folgen"}
        />
        <DetailInfoRow
          label={lookingForLabel}
          items={person.lookingFor}
          fallback={locale === "ru" ? "РџРѕРєР° Р±РµР· СѓС‚РѕС‡РЅРµРЅРёР№" : "Noch offen"}
        />
      </div>

      <div className="mt-4 rounded-[22px] border border-white/10 bg-black/10 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8FA8D6]">
          {aboutLabel}
        </p>
        <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">{person.about}</p>
      </div>

      <button
        onClick={onAction}
        disabled={actionDisabled}
        className="mt-4 w-full rounded-[18px] bg-[#007AFF] px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function DetailInfoRow({
  label,
  items,
  fallback,
}: {
  label: string;
  items: string[];
  fallback: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8FA8D6]">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(items.length > 0 ? items : [fallback]).map((item) => (
          <span
            key={`${label}-${item}`}
            className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-[#D8E6FF]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function EventPhotoCard({
  title,
  city,
  date,
  description,
  seatsLeft,
  buttonLabel,
}: {
  title: string;
  city: string;
  date: string;
  description: string;
  seatsLeft: string;
  buttonLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(8,13,28,0.96),rgba(12,26,58,0.88)_55%,rgba(0,122,255,0.56))] p-5">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-[#8EC5FF]">
        <span>{date}</span>
        <span>{city}</span>
      </div>
      <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.05em] text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">{description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[#D8E6FF]">{seatsLeft}</span>
        <button className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#06101E]">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

function ContactCard({
  person,
  buttonLabel,
  onClick,
}: {
  person: Person;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{person.name}</h4>
          <p className="mt-1 text-sm text-[#8A94A6]">{person.city}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {person.interests.slice(0, 3).map((interest) => (
              <span
                key={`${person.id}-${interest}`}
                className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-[#D8E6FF]"
              >
                {interest}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-4 py-2 text-xs font-medium text-white">
            {buttonLabel}
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

function ChatThreadRow({
  person,
  lastMessage,
  time,
  unreadCount,
  onClick,
}: {
  person: Person;
  lastMessage: string;
  time: string;
  unreadCount: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-[#007AFF]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="truncate font-medium text-white">{person.name}</h4>
              <p className="mt-1 truncate text-sm text-[#8A94A6]">{person.city}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] font-medium text-[#8EC5FF]">{time}</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#007AFF] px-2 py-0.5 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#C7D1E0]">{lastMessage}</p>
        </div>
      </div>
    </button>
  );
}

function RequestInboxCard({
  person,
  message,
  date,
  acceptLabel,
  declineLabel,
  onAccept,
  onDecline,
}: {
  person: Person;
  message: string;
  date: string;
  acceptLabel: string;
  declineLabel: string;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
          {person.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photoUrl}
              alt={person.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-medium text-white">{person.name}</h4>
              <p className="mt-1 text-sm text-[#8A94A6]">{person.city}</p>
            </div>
            <span className="text-[11px] font-medium text-[#8EC5FF]">{date}</span>
          </div>
          <div className="mt-4 rounded-[20px] border border-white/10 bg-black/10 p-4 text-sm leading-6 text-[#D8E6FF]">
            {message}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={onAccept}
              className="rounded-[18px] bg-[#007AFF] px-4 py-3 text-sm font-medium text-white"
            >
              {acceptLabel}
            </button>
            <button
              onClick={onDecline}
              className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-[#D8E6FF]"
            >
              {declineLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingStepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#007AFF]/16 text-sm font-semibold text-[#8EC5FF]">
          вњ“
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-2 text-sm leading-6 text-[#A8B6CB]">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ChatCard({
  locale,
  currentUserId,
  partner,
  messages,
  message,
  setMessage,
  loading,
  feedback,
  bottomRef,
  onBack,
  onSend,
}: {
  locale: Locale;
  currentUserId: string;
  partner: Person;
  messages: ChatMessageRow[];
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  loading: boolean;
  feedback: string | null;
  bottomRef: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onSend: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[#D8E6FF]"
        >
          <ChevronLeft className="h-4 w-4" />
          {locale === "ru" ? "РќР°Р·Р°Рґ" : "ZurГјck"}
        </button>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
            {partner.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={partner.photoUrl}
                alt={partner.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              getInitials(partner.name)
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{partner.name}</p>
            <p className="truncate text-xs text-[#8A94A6]">{partner.city}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-[360px] space-y-3 overflow-y-auto rounded-[22px] border border-white/8 bg-black/10 p-3">
        {loading && <InlineNote text={locale === "ru" ? "Р§Р°С‚ Р·Р°РіСЂСѓР¶Р°РµС‚СЃСЏ..." : "Chat wird geladen..."} />}
        {!loading && messages.length === 0 && (
          <EmptyMobileCard
            title={locale === "ru" ? "РџРѕРєР° РЅРµС‚ СЃРѕРѕР±С‰РµРЅРёР№" : "Noch keine Nachrichten"}
            text={
              locale === "ru"
                ? "РћС‚РїСЂР°РІСЊС‚Рµ РїРµСЂРІРѕРµ СЃРѕРѕР±С‰РµРЅРёРµ, С‡С‚РѕР±С‹ РЅР°С‡Р°С‚СЊ РѕР±С‰РµРЅРёРµ РІРЅСѓС‚СЂРё NeuStart."
                : "Sende die erste Nachricht, um das GesprГ¤ch in NeuStart zu beginnen."
            }
          />
        )}
        {messages.map((item) => (
          <MessageBubble
            key={item.id}
            own={item.sender_user_id === currentUserId}
            message={item.message}
            time={formatTime(locale, item.created_at)}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {feedback && <InlineNote text={feedback} tone="warning" className="mt-4" />}

      <div className="mt-4 flex items-end gap-3">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={locale === "ru" ? "РќР°РїРёС€РёС‚Рµ СЃРѕРѕР±С‰РµРЅРёРµ..." : "Schreibe eine Nachricht..."}
          className="min-h-[56px] flex-1 rounded-[20px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
        />
        <button
          onClick={onSend}
          className="inline-flex h-[56px] items-center gap-2 rounded-[20px] bg-[#007AFF] px-4 text-sm font-medium text-white"
        >
          <SendHorizonal className="h-4 w-4" />
          {locale === "ru" ? "РћС‚РїСЂР°РІРёС‚СЊ" : "Senden"}
        </button>
      </div>
    </div>
  );
}

function MessageBubble({
  own,
  message,
  time,
}: {
  own: boolean;
  message: string;
  time: string;
}) {
  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[20px] px-4 py-3 text-sm leading-6 ${
          own
            ? "bg-[#007AFF] text-white"
            : "border border-white/10 bg-white/[0.05] text-[#D8E6FF]"
        }`}
      >
        <p>{message}</p>
        <p className={`mt-2 text-[11px] ${own ? "text-white/80" : "text-[#8A94A6]"}`}>{time}</p>
      </div>
    </div>
  );
}

function ConnectionRequestModal({
  locale,
  person,
  message,
  setMessage,
  mode,
  loading,
  feedback,
  onClose,
  onSend,
}: {
  locale: Locale;
  person: Person;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  mode: "compose" | "success";
  loading: boolean;
  feedback: string | null;
  onClose: () => void;
  onSend: () => void;
}) {
  const quickMessages =
    locale === "ru"
      ? [
          "рџ‘‹ РџСЂРёРІРµС‚!",
          "в• РџСЂРµРґР»Р°РіР°СЋ РІСЃС‚СЂРµС‚РёС‚СЊСЃСЏ Р·Р° РєРѕС„Рµ",
          "рџ¤ќ РҐРѕС‡Сѓ РїРѕР·РЅР°РєРѕРјРёС‚СЊСЃСЏ",
          "рџ’ј РРЅС‚РµСЂРµСЃСѓРµС‚ РЅРµС‚РІРѕСЂРєРёРЅРі",
          "рџЊї Р‘СѓРґСѓ СЂР°Рґ РѕР±С‰РµРЅРёСЋ",
        ]
      : [
          "рџ‘‹ Hallo!",
          "в• Lust auf einen Kaffee?",
          "рџ¤ќ Ich wГјrde dich gern kennenlernen",
          "рџ’ј Ich suche Networking",
          "рџЊї Ich freue mich auf Austausch",
        ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#02050f]/75 px-4 backdrop-blur-md">
      <div className="w-full max-w-[420px] rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.98),rgba(8,12,24,0.98))] p-5 shadow-[0_40px_120px_-50px_rgba(0,0,0,1)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8FA8D6]">
              NeuStart
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
              {locale === "ru" ? "РџРѕР·РЅР°РєРѕРјРёС‚СЊСЃСЏ" : "Kennenlernen"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#A8B6CB]">
              {mode === "success"
                ? locale === "ru"
                  ? "Р—Р°РїСЂРѕСЃ РѕС‚РїСЂР°РІР»РµРЅ. Р•СЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РїСЂРёРјРµС‚ РїСЂРёРіР»Р°С€РµРЅРёРµ, РІС‹ СЃРјРѕР¶РµС‚Рµ РѕР±С‰Р°С‚СЊСЃСЏ РІРЅСѓС‚СЂРё NeuStart."
                  : "Anfrage gesendet. Sobald die Einladung angenommen wird, kГ¶nnt ihr in NeuStart schreiben."
                : locale === "ru"
                  ? "РћС‚РїСЂР°РІСЊС‚Рµ РЅРµР±РѕР»СЊС€РѕРµ СЃРѕРѕР±С‰РµРЅРёРµ. РџРѕСЃР»Рµ РїСЂРёРЅСЏС‚РёСЏ Р·Р°РїСЂРѕСЃР° РІС‹ СЃРјРѕР¶РµС‚Рµ РѕР±С‰Р°С‚СЊСЃСЏ РІРЅСѓС‚СЂРё NeuStart."
                  : "Sende eine kurze Nachricht. Nach der Annahme kГ¶nnt ihr innerhalb von NeuStart schreiben."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-[#D8E6FF]"
            aria-label={locale === "ru" ? "Р—Р°РєСЂС‹С‚СЊ" : "SchlieГџen"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] p-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
            {person.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photoUrl}
                alt={person.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              getInitials(person.name)
            )}
          </div>
          <div>
            <p className="font-medium text-white">{person.name}</p>
            <p className="mt-1 text-sm text-[#8A94A6]">{person.city}</p>
          </div>
        </div>

        {feedback && <InlineNote text={feedback} tone="warning" className="mt-4" />}

        {mode === "compose" ? (
          <>
            <div className="mt-5 flex flex-wrap gap-2">
              {quickMessages.map((item) => (
                <button
                  key={item}
                  onClick={() => setMessage(item)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[#D8E6FF]"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-white">
                  {locale === "ru" ? "Р’Р°С€Рµ СЃРѕРѕР±С‰РµРЅРёРµ" : "Deine Nachricht"}
                </label>
                <span className="text-xs text-[#8A94A6]">{message.length}/300</span>
              </div>
              <textarea
                value={message}
                maxLength={300}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[120px] w-full rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
                placeholder={locale === "ru" ? "РќР°РїРёС€РёС‚Рµ РЅРµСЃРєРѕР»СЊРєРѕ С‚С‘РїР»С‹С… СЃР»РѕРІ..." : "Schreibe ein paar warme Zeilen..."}
              />
            </div>

            <button
              onClick={onSend}
              disabled={loading || !message.trim()}
              className="mt-5 w-full rounded-[20px] bg-[#007AFF] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "..." : locale === "ru" ? "РћС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ" : "Anfrage senden"}
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-[20px] bg-[#007AFF] py-3 text-sm font-medium text-white"
          >
            {locale === "ru" ? "РџРѕРЅСЏС‚РЅРѕ" : "Verstanden"}
          </button>
        )}
      </div>
    </div>
  );
}

function InfoBanner({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-[#007AFF]/18 bg-[#007AFF]/10 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#D8E6FF]">{text}</p>
    </div>
  );
}

function InlineNote({
  text,
  tone = "info",
  className = "",
}: {
  text: string;
  tone?: "info" | "warning";
  className?: string;
}) {
  return (
    <div
      className={`rounded-[18px] border px-4 py-3 text-sm leading-6 ${
        tone === "warning"
          ? "border-amber-300/20 bg-amber-300/10 text-amber-100"
          : "border-white/10 bg-white/[0.05] text-[#D8E6FF]"
      } ${className}`}
    >
      {text}
    </div>
  );
}

function MobileField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
        placeholder={placeholder}
      />
    </label>
  );
}

function TagCloud({
  title,
  tags,
  onSelect,
}: {
  title: string;
  tags: readonly string[];
  onSelect?: (tag: string) => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <h4 className="text-sm font-medium text-white">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect?.(tag)}
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-[#C7D1E0] transition-all hover:border-[#007AFF]/30 hover:text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function PartnerOfferCard({
  title,
  category,
  description,
  offer,
}: {
  title: string;
  category: string;
  description: string;
  offer: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4">
      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-[#AAB7CA]">
        {category}
      </span>
      <h4 className="mt-3 text-lg font-semibold text-white">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{description}</p>
      <div className="mt-4 rounded-[18px] border border-[#007AFF]/16 bg-[#007AFF]/10 px-3 py-3 text-xs font-medium text-[#8EC5FF]">
        {offer}
      </div>
    </div>
  );
}

function EmptyMobileCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.05]">
        <Inbox className="h-6 w-6 text-[#8EC5FF]" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#8A94A6]">{text}</p>
    </div>
  );
}

function LoadingCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
      <div className="animate-pulse space-y-3">
        <div className="h-5 w-32 rounded-full bg-white/10" />
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded-full bg-white/10 ${index === lines - 1 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileNavButton({
  label,
  icon: Icon,
  active,
  badgeCount = 0,
  onClick,
}: {
  label: string;
  icon: IconType;
  active: boolean;
  badgeCount?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex min-w-0 flex-col items-center gap-1 rounded-[18px] px-1 py-2 transition-all duration-300 ${
        active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
      }`}
    >
      <div className="relative">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-300 ${
            active
              ? "bg-[#007AFF]/16 text-[#8EC5FF]"
              : "text-[#8A94A6] group-hover:text-white"
          }`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        {badgeCount > 0 && (
          <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#007AFF] px-1 text-[9px] font-semibold text-white">
            {badgeCount}
          </span>
        )}
      </div>
      <span className={`truncate text-[10px] font-medium ${active ? "text-white" : "text-[#8A94A6]"}`}>
        {label}
      </span>
    </button>
  );
}

function PanelCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </GlassCard>
  );
}

function MetricCard({
  value,
  label,
  delta,
}: {
  value: string;
  label: string;
  delta: string;
}) {
  return (
    <GlassCard className="p-5">
      <p className="text-[1.9rem] font-semibold tracking-[-0.05em] text-white">{value}</p>
      <p className="mt-2 text-sm font-medium text-[#A8B6CB]">{label}</p>
      <p className="mt-2 text-xs text-[#8EC5FF]">{delta}</p>
    </GlassCard>
  );
}

function ChartCard({
  title,
  points,
}: {
  title: string;
  points: ReadonlyArray<{ label: string; value: number }>;
}) {
  const maxValue = Math.max(...points.map((point) => point.value));

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 text-[#8EC5FF]">
        <ChartNoAxesCombined className="h-5 w-5" />
        <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
      </div>
      <div className="mt-6 flex h-60 items-end gap-3 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-4">
        {points.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-[18px] bg-[linear-gradient(180deg,#5DD8FF,#007AFF)] motion-safe:animate-[pulseBar_4s_ease-in-out_infinite]"
                style={{ height: `${(point.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-[#A8B6CB]">{point.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function FunnelBar({
  title,
  value,
  percentage,
}: {
  title: string;
  value: string;
  percentage: number;
}) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-white/[0.04] p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">{title}</p>
        <span className="text-xs font-medium text-[#8EC5FF]">{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
        <div
          className="h-2 rounded-full bg-[linear-gradient(90deg,#48C6FF,#007AFF)] motion-safe:animate-[glowSlide_6s_ease-in-out_infinite]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PipelineBox({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className="rounded-full border border-[#007AFF]/16 bg-[#007AFF]/10 px-3 py-1 text-xs font-medium text-[#8EC5FF]">
          {value}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#C7D1E0]">{note}</p>
    </div>
  );
}

function InsightNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8EC5FF]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">{text}</p>
    </div>
  );
}

function MemberRow({
  person,
  profileStatusLabel,
}: {
  person: Person;
  profileStatusLabel: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
          {getInitials(person.name)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-medium text-white">{person.name}</h4>
              <p className="text-sm text-[#8A94A6]">
                {person.city} вЂў {person.profession}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#8EC5FF]">
              {person.language}
            </span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#667894]">
            {profileStatusLabel}: {person.status}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{person.reason}</p>
        </div>
      </div>
    </div>
  );
}

function HealthPanel({ locale }: { locale: Locale }) {
  const copy = healthPanelCopy[locale];
  const items = copy.items;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">{item.label}</p>
            <span className="text-xs font-medium text-[#8EC5FF]">{item.value}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
            <div
              className="h-2 rounded-full bg-[linear-gradient(90deg,#48C6FF,#007AFF)] motion-safe:animate-[glowSlide_6s_ease-in-out_infinite]"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
      <div className="grid gap-3 md:grid-cols-2">
        <StatusPill label={copy.pendingReplies} value="7" />
        <StatusPill label={copy.escalatedOffers} value="3" />
      </div>
    </div>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#667894]">{label}</p>
      <p className="mt-2 text-sm font-medium text-[#8EC5FF]">{value}</p>
    </div>
  );
}

function MiniEventRow({
  title,
  meta,
  seatsLeft,
}: {
  title: string;
  meta: string;
  seatsLeft: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="mt-1 text-sm text-[#8A94A6]">{meta}</p>
        </div>
        <CalendarDays className="h-4 w-4 text-[#8EC5FF]" />
      </div>
      <p className="mt-3 text-xs font-medium text-[#8EC5FF]">{seatsLeft}</p>
    </div>
  );
}

function QueueBox({
  title,
  meta,
  note,
}: {
  title: string;
  meta: string;
  note: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="mt-1 text-sm text-[#8A94A6]">{meta}</p>
        </div>
        <Target className="h-4 w-4 text-[#8EC5FF]" />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{note}</p>
    </div>
  );
}

function OfferRow({
  title,
  status,
  value,
}: {
  title: string;
  status: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="mt-2 text-sm text-[#C7D1E0]">{value}</p>
        </div>
        <span className="rounded-full border border-[#007AFF]/16 bg-[#007AFF]/10 px-3 py-1 text-xs font-medium text-[#8EC5FF]">
          {status}
        </span>
      </div>
    </div>
  );
}

function ModerationRow({
  title,
  priority,
  note,
}: {
  title: string;
  priority: string;
  note: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-medium text-white">{title}</h4>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-[#AAB7CA]">
          {priority}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#C7D1E0]">{note}</p>
    </div>
  );
}

function formatRequestDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "de-DE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatEventDateRange(locale: Locale, startsAt: string, endsAt: string | null) {
  const eventLocale = locale === "ru" ? "ru-RU" : "de-DE";
  const startLabel = new Intl.DateTimeFormat(eventLocale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(startsAt));

  if (!endsAt) {
    return startLabel;
  }

  const endLabel = new Intl.DateTimeFormat(eventLocale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(endsAt));

  return `${startLabel} вЂ“ ${endLabel}`;
}

function formatEventLocation(
  locale: Locale,
  city: string | null,
  address: string | null,
  onlineUrl: string | null,
) {
  if (address?.trim()) {
    return city?.trim() ? `${city} вЂў ${address}` : address;
  }

  if (onlineUrl?.trim()) {
    return locale === "ru" ? "РћРЅР»Р°Р№РЅ" : "Online";
  }

  return city?.trim() || (locale === "ru" ? "Р“РµСЂРјР°РЅРёСЏ" : "Deutschland");
}

function formatTime(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isActiveProfile(profile: ProfileRow) {
  return Boolean(profile.user_id && profile.name?.trim() && profile.city?.trim());
}

function appendTag(currentValue: string, tag: string) {
  const currentItems = splitList(currentValue);

  if (currentItems.includes(tag)) {
    return currentValue;
  }

  return [...currentItems, tag].join(", ");
}

function mapProfileToForm(profile: ProfileRow): ProfileFormState {
  return {
    name: profile.name ?? "",
    city: profile.city ?? "",
    languages: (profile.languages ?? []).join(", "),
    interests: (profile.interests ?? []).join(", "),
    lookingFor: (profile.looking_for ?? []).join(", "),
    about: profile.about ?? "",
    photoUrl: profile.photo_url ?? "",
  };
}

function mapProfileToPerson(profile: ProfileRow, locale: Locale, index: number): Person {
  const languages = profile.languages ?? [];
  const interests = profile.interests ?? [];
  const lookingFor = profile.looking_for ?? [];
  const firstLanguage = languages[0] ?? (locale === "ru" ? "РќРµ СѓРєР°Р·Р°РЅРѕ" : "Nicht angegeben");
  const firstGoal =
    lookingFor[0] ?? (locale === "ru" ? socialCopy.ru.communityMember : socialCopy.de.communityMember);

  return {
    id: stringToNumberId(`${profile.user_id}-${index}`),
    userId: profile.user_id,
    name: profile.name,
    age: 0,
    city: profile.city || (locale === "ru" ? "Р“РµСЂРјР°РЅРёСЏ" : "Deutschland"),
    profession: firstGoal,
    language: firstLanguage,
    about: profile.about || socialCopy[locale].freshStart,
    photoUrl: profile.photo_url ?? undefined,
    interests,
    lookingFor,
    reason: socialCopy[locale].freshStart,
    status: socialCopy[locale].activeProfile,
  };
}

function stringToNumberId(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash) || 1;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

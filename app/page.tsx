"use client";

import { useState, type ComponentType } from "react";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Home,
  Inbox,
  Languages,
  MessageSquare,
  Network,
  PanelsTopLeft,
  Plus,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  eventsByLocale,
  partnersByLocale,
  peopleByLocale,
  profileTags,
  servicesByLocale,
  translations,
  type Locale,
  type Person,
  type Screen,
} from "./i18n";

type IconType = ComponentType<{ className?: string }>;

const serviceIcons: IconType[] = [
  BriefcaseBusiness,
  Users,
  GraduationCap,
  Network,
];

const navItems: Array<{
  screen: Screen | "more";
  labelKey: "home" | "profile" | "people" | "weekly" | "contacts" | "more";
  icon: IconType;
}> = [
  { screen: "home", labelKey: "home", icon: Home },
  { screen: "profile", labelKey: "profile", icon: UserRound },
  { screen: "people", labelKey: "people", icon: Users },
  { screen: "weekly", labelKey: "weekly", icon: Sparkles },
  { screen: "contacts", labelKey: "contacts", icon: MessageSquare },
  { screen: "more", labelKey: "more", icon: PanelsTopLeft },
];

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [locale, setLocale] = useState<Locale>("de");
  const [contacts, setContacts] = useState<number[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState(1);
  const [photoPreview, setPhotoPreview] = useState("");

  const t = translations[locale];
  const people = peopleByLocale[locale];
  const events = eventsByLocale[locale];
  const partners = partnersByLocale[locale];
  const services = servicesByLocale[locale];
  const selectedPerson =
    people.find((person) => person.id === selectedPersonId) ?? people[0];

  function addContact(id: number) {
    setContacts((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-[#F5F7FA]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#007AFF]/20 blur-[120px]" />
        <div className="absolute left-[-120px] top-[280px] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute bottom-[120px] right-[-140px] h-[360px] w-[360px] rounded-full bg-blue-500/14 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col border-x border-white/8 bg-[rgba(8,12,24,0.72)] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.92)] backdrop-blur-[28px]">
        <header className="sticky top-0 z-20 border-b border-white/8 bg-[rgba(8,12,24,0.6)] px-5 py-4 backdrop-blur-[28px]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8FA8D6]">
                {t.appLabel}
              </p>
              <h1 className="mt-1 text-[2rem] font-semibold tracking-[-0.04em] text-white">
                {t.brand}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start">
              <button
                onClick={() => setScreen("admin")}
                className="h-8 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 text-[11px] font-medium text-[#C5CFDD] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-200 hover:border-white/16 hover:bg-white/[0.09]"
              >
                {t.admin}
              </button>
              <div
                className="flex h-8 items-center rounded-full border border-white/10 bg-white/[0.06] px-1 text-[11px] font-medium text-[#8A94A6] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                aria-label={t.languageSwitcherLabel}
              >
                <button
                  onClick={() => setLocale("de")}
                  className={`flex h-6 items-center rounded-full px-2.5 transition-all duration-200 ${
                    locale === "de"
                      ? "bg-[#007AFF] text-white shadow-[0_0_26px_rgba(0,122,255,0.55)]"
                      : "text-[#8A94A6] hover:text-white"
                  }`}
                >
                  {t.localeButtons.de}
                </button>
                <span className="px-1 text-white/18">|</span>
                <button
                  onClick={() => setLocale("ru")}
                  className={`flex h-6 items-center rounded-full px-2.5 transition-all duration-200 ${
                    locale === "ru"
                      ? "bg-[#007AFF] text-white shadow-[0_0_26px_rgba(0,122,255,0.55)]"
                      : "text-[#8A94A6] hover:text-white"
                  }`}
                >
                  {t.localeButtons.ru}
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-5 pb-32 pt-5">
          {screen === "home" && (
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(11,18,36,0.92),rgba(9,30,68,0.86)_52%,rgba(0,122,255,0.72))] p-6 shadow-[0_35px_90px_-45px_rgba(0,122,255,0.75)]">
                <div className="pointer-events-none absolute" />
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-[#C6D5F2] backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5 text-[#8DC0FF]" />
                  {t.homeTag}
                </div>
                <h2 className="mt-4 text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                  {t.homeTitle}
                </h2>
                <p className="mt-4 max-w-[30ch] text-sm leading-7 text-[#D8E6FF]">
                  {t.homeText}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setScreen("profile")}
                    className="rounded-[20px] border border-white/10 bg-white/[0.12] px-4 py-3 text-sm font-medium text-white backdrop-blur-2xl transition-all duration-200 hover:bg-white/[0.18]"
                  >
                    {t.createProfile}
                  </button>
                  <button
                    onClick={() => setScreen("people")}
                    className="rounded-[20px] bg-[#007AFF] px-4 py-3 text-sm font-medium text-white shadow-[0_18px_40px_-18px_rgba(0,122,255,0.75)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_22px_52px_-18px_rgba(0,122,255,0.82)]"
                  >
                    {t.findPeople}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {t.stats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              <BlockTitle title={t.weeklyTitle} text={t.weeklyText} />
              <div className="space-y-3">
                {people.slice(0, 3).map((person) => (
                  <WeeklyPickCard
                    key={person.id}
                    person={person}
                    buttonLabel={t.weeklyConnect}
                    onClick={() => {
                      setSelectedPersonId(person.id);
                      setScreen("people");
                    }}
                  />
                ))}
              </div>

              <BlockTitle title={t.eventOfWeekTitle} text={t.eventOfWeekText} />
              <FeaturedEventCard
                event={events[0]}
                badge={t.eventBadge}
                joinLabel={t.join}
              />

              <BlockTitle
                title={t.usefulServicesTitle}
                text={t.usefulServicesText}
              />
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    subtitle={service.subtitle}
                    icon={serviceIcons[index] ?? PanelsTopLeft}
                  />
                ))}
              </div>

              <AIAssistantCard
                title={t.aiAssistantTitle}
                text={t.aiAssistantText}
                bullets={t.aiAssistantBullets}
                buttonLabel={t.aiAssistantButton}
              />

              <BlockTitle title={t.whyTitle} text={t.whyText} />
            </div>
          )}

          {screen === "profile" && (
            <div className="space-y-5">
              <BlockTitle title={t.profileTitle} text={t.profileText} />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_30px_80px_-52px_rgba(0,0,0,1)] backdrop-blur-[24px]">
                <label className="mb-3 block text-sm font-medium text-white">
                  {t.profilePhoto}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.06]">
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photoPreview}
                        alt={t.profilePhotoAlt}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound className="h-8 w-8 text-[#8FA8D6]" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-[#8A94A6] file:mr-3 file:rounded-full file:border file:border-white/10 file:bg-white/[0.06] file:px-4 file:py-2 file:text-xs file:font-medium file:text-white file:backdrop-blur-xl"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPhotoPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>
              </div>

              <FormInput
                label={t.profileFields.name}
                placeholder={t.profilePlaceholders.name}
              />
              <FormInput
                label={t.profileFields.age}
                placeholder={t.profilePlaceholders.age}
              />
              <FormInput
                label={t.profileFields.city}
                placeholder={t.profilePlaceholders.city}
              />
              <FormInput
                label={t.profileFields.origin}
                placeholder={t.profilePlaceholders.origin}
              />
              <FormInput
                label={t.profileFields.moveYear}
                placeholder={t.profilePlaceholders.moveYear}
              />
              <FormInput
                label={t.profileFields.profession}
                placeholder={t.profilePlaceholders.profession}
              />
              <textarea
                className="min-h-28 w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none backdrop-blur-[24px] placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
                placeholder={t.profileFields.about}
              />

              <TagSection
                title={t.interestsTitle}
                tags={profileTags[locale].interests}
              />

              <TagSection
                title={t.lookingForTitle}
                tags={profileTags[locale].lookingFor}
              />

              <button
                onClick={() => setScreen("people")}
                className="w-full rounded-[22px] bg-[#007AFF] py-4 text-sm font-medium text-white shadow-[0_18px_42px_-18px_rgba(0,122,255,0.8)] transition-all duration-200 hover:translate-y-[-1px]"
              >
                {t.saveProfile}
              </button>
            </div>
          )}

          {screen === "people" && (
            <div className="space-y-4">
              <BlockTitle title={t.peopleTitle} text={t.peopleText} />
              {people.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  germanLevelLabel={t.germanLevel}
                  separator={t.separators.dot}
                  skipLabel={t.skip}
                  addLabel={t.add}
                  onOpen={() => setSelectedPersonId(person.id)}
                  onAdd={() => addContact(person.id)}
                />
              ))}

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_36px_90px_-50px_rgba(0,0,0,1)] backdrop-blur-[26px]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {selectedPerson.name}
                </h3>
                <p className="mt-1 text-sm text-[#8A94A6]">
                  {selectedPerson.city}, {selectedPerson.age} {t.separators.dot}{" "}
                  {t.germanLevel} {selectedPerson.language}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#C7D1E0]">
                  {selectedPerson.about}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedPerson.lookingFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-[#007AFF]/15 px-3 py-1 text-xs font-medium text-[#8EC5FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addContact(selectedPerson.id)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#007AFF] py-3 text-sm font-medium text-white shadow-[0_20px_46px_-18px_rgba(0,122,255,0.85)]"
                >
                  <Plus className="h-4 w-4" />
                  {t.addToContacts}
                </button>
              </div>
            </div>
          )}

          {screen === "weekly" && (
            <div className="space-y-4">
              <BlockTitle title={t.weeklyScreenTitle} text={t.weeklyScreenText} />
              {people.map((person) => (
                <div
                  key={person.id}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[26px]"
                >
                  <WeeklyPickCard
                    person={person}
                    buttonLabel={t.weeklyConnect}
                    onClick={() => setSelectedPersonId(person.id)}
                  />
                  <p className="mt-3 rounded-[20px] border border-[#007AFF]/16 bg-[#007AFF]/10 p-3 text-sm font-medium text-[#8EC5FF]">
                    {t.reasonLabel}: {person.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          {screen === "contacts" && (
            <div className="space-y-4">
              <BlockTitle title={t.contactsTitle} text={t.contactsText} />
              {contacts.length === 0 ? (
                <EmptyState
                  title={t.contactsEmptyTitle}
                  text={t.contactsEmptyText}
                  button={t.findPeople}
                  onClick={() => setScreen("people")}
                />
              ) : (
                people
                  .filter((person) => contacts.includes(person.id))
                  .map((person) => (
                    <WeeklyPickCard
                      key={person.id}
                      person={person}
                      buttonLabel={t.weeklyConnect}
                      onClick={() => setSelectedPersonId(person.id)}
                    />
                  ))
              )}
            </div>
          )}

          {screen === "events" && (
            <div className="space-y-4">
              <BlockTitle title={t.eventsTitle} text={t.eventsText} />
              {events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[26px]"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-[#8EC5FF]">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {event.date} {t.separators.dot} {event.city}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#C7D1E0]">
                    {event.description}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-[#627089]">
                    {t.organizer}: {event.org}
                  </p>
                  <button className="mt-5 rounded-full bg-[#007AFF] px-4 py-2.5 text-xs font-medium text-white shadow-[0_18px_42px_-18px_rgba(0,122,255,0.85)]">
                    {t.join}
                  </button>
                </div>
              ))}
            </div>
          )}

          {screen === "partners" && (
            <div className="space-y-4">
              <BlockTitle title={t.partnersTitle} text={t.partnersText} />
              {partners.map((partner) => (
                <div
                  key={partner.title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[26px]"
                >
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-[#AAB7CA]">
                    {t.partnerBadge}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {partner.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#8EC5FF]">
                    {partner.category}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#C7D1E0]">
                    {partner.description}
                  </p>
                  <button
                    onClick={() => alert(t.partnerAlert)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white backdrop-blur-xl transition-all duration-200 hover:border-white/16 hover:bg-white/[0.1]"
                  >
                    {t.partnerButton}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {screen === "admin" && (
            <div className="space-y-4">
              <BlockTitle title={t.adminTitle} text={t.adminText} />
              <div className="grid grid-cols-2 gap-3">
                {t.adminStats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[26px]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {t.adminWeeklyTitle}
                </h3>
                <p className="mt-3 text-sm text-[#C7D1E0]">
                  {t.adminWeeklyText}
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[26px]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">
                  {t.adminCommunitiesTitle}
                </h3>
                <p className="mt-3 text-sm text-[#C7D1E0]">{t.adminCommunitiesText}</p>
              </div>
            </div>
          )}
        </section>

        <nav className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-[calc(28rem-1.5rem)] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[rgba(10,16,30,0.72)] px-2 py-2 shadow-[0_30px_90px_-42px_rgba(0,0,0,1)] backdrop-blur-[30px]">
          <div className="grid grid-cols-6 gap-1">
            {navItems.map((item) => (
              <NavButton
                key={item.labelKey}
                label={t.nav[item.labelKey]}
                icon={item.icon}
                active={
                  item.screen === "more"
                    ? screen === "events" || screen === "partners"
                    : screen === item.screen
                }
                onClick={() =>
                  setScreen(item.screen === "more" ? "events" : item.screen)
                }
              />
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_28px_70px_-52px_rgba(0,0,0,1)] backdrop-blur-[24px]">
      <p className="text-[1.65rem] font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium leading-5 text-[#8A94A6]">{label}</p>
    </div>
  );
}

function BlockTitle({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-[2rem] font-semibold tracking-[-0.05em] text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-7 text-[#8A94A6]">{text}</p>
    </div>
  );
}

function FormInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white">{label}</span>
      <input
        className="w-full rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-sm text-white outline-none backdrop-blur-[24px] placeholder:text-[#6F7B90] focus:border-[#007AFF] focus:bg-white/[0.08]"
        placeholder={placeholder}
      />
    </label>
  );
}

function TagSection({
  title,
  tags,
}: {
  title: string;
  tags: readonly string[];
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_28px_70px_-52px_rgba(0,0,0,1)] backdrop-blur-[24px]">
      <h3 className="mb-3 text-sm font-medium text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-[#C7D1E0] transition-all duration-200 hover:border-[#007AFF]/40 hover:text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

function WeeklyPickCard({
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
      className="w-full rounded-[28px] border border-white/10 bg-white/[0.05] p-4 text-left shadow-[0_30px_70px_-52px_rgba(0,0,0,1)] backdrop-blur-[24px] transition-all duration-300 hover:border-[#007AFF]/28 hover:bg-white/[0.07] hover:shadow-[0_36px_90px_-46px_rgba(0,122,255,0.25)]"
    >
      <div className="flex items-start gap-4">
        <AvatarBadge name={person.name} className="h-16 w-16 rounded-full" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-medium text-white">{person.name}</h3>
              <p className="text-sm text-[#8A94A6]">{person.city}</p>
            </div>
            <span className="rounded-full border border-[#007AFF]/24 bg-[#007AFF]/12 px-2.5 py-1 text-[11px] font-medium text-[#8EC5FF]">
              {person.language}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {person.interests.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#AEB9CA]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-4 py-2 text-xs font-medium text-white shadow-[0_18px_40px_-18px_rgba(0,122,255,0.8)]">
              {buttonLabel}
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function FeaturedEventCard({
  event,
  badge,
  joinLabel,
}: {
  event: { title: string; city: string; date: string; org: string; description: string };
  badge: string;
  joinLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(8,13,28,0.96),rgba(12,26,58,0.88)_55%,rgba(0,122,255,0.56))] p-5 shadow-[0_38px_100px_-44px_rgba(0,122,255,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8E6FF]">
          {badge}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-medium text-[#D8E6FF]">
          {event.org}
        </span>
      </div>
      <h3 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-white">
        {event.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#D8E6FF]">{event.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3 rounded-[24px] border border-white/10 bg-white/[0.09] px-4 py-3 backdrop-blur-[24px]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08]">
            <CalendarDays className="h-5 w-5 text-[#8EC5FF]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{event.date}</p>
            <p className="text-xs text-[#C5D6F4]">{event.city}</p>
          </div>
        </div>
        <button className="rounded-full bg-white px-4 py-2 text-xs font-medium text-[#06101E]">
          {joinLabel}
        </button>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: IconType;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_30px_70px_-54px_rgba(0,0,0,1)] backdrop-blur-[24px]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-[#007AFF]/18 bg-[#007AFF]/10 shadow-[0_0_24px_rgba(0,122,255,0.16)]">
        <Icon className="h-5 w-5 text-[#8EC5FF]" />
      </div>
      <h3 className="mt-4 text-sm font-medium text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-[#8A94A6]">{subtitle}</p>
    </div>
  );
}

function AIAssistantCard({
  title,
  text,
  bullets,
  buttonLabel,
}: {
  title: string;
  text: string;
  bullets: readonly string[];
  buttonLabel: string;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_34px_90px_-52px_rgba(0,0,0,1)] backdrop-blur-[28px]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[#007AFF] shadow-[0_0_34px_rgba(0,122,255,0.45)]">
          <Bot className="h-7 w-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[#C7D1E0]">{text}</p>
          <div className="mt-4 space-y-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-2 text-sm text-[#D3DCE8]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#007AFF] shadow-[0_0_14px_rgba(0,122,255,0.9)]" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2.5 text-xs font-medium text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.12]">
            {buttonLabel}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  germanLevelLabel,
  separator,
  skipLabel,
  addLabel,
  onOpen,
  onAdd,
}: {
  person: Person;
  germanLevelLabel: string;
  separator: string;
  skipLabel: string;
  addLabel: string;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[28px]">
      <button onClick={onOpen} className="flex w-full gap-4 text-left">
        <AvatarBadge name={person.name} className="h-20 w-20 rounded-[24px]" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white">{person.name}</h3>
          <p className="text-sm text-[#8A94A6]">
            {person.city}, {person.age} {separator} {person.profession}
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#007AFF]/18 bg-[#007AFF]/10 px-3 py-1 text-xs font-medium text-[#8EC5FF]">
            <Languages className="h-3.5 w-3.5" />
            {germanLevelLabel}: {person.language}
          </div>
        </div>
      </button>
      <p className="mt-4 line-clamp-2 text-sm leading-7 text-[#C7D1E0]">
        {person.about}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {person.interests.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#AEB9CA]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-[20px] border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-[#8A94A6] transition-all duration-200 hover:text-white">
          <X className="h-4 w-4" />
          {skipLabel}
        </button>
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-[20px] bg-[#007AFF] py-3 text-sm font-medium text-white shadow-[0_18px_42px_-18px_rgba(0,122,255,0.85)]"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}

function AvatarBadge({ name, className }: { name: string; className: string }) {
  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03))] font-semibold text-[#DDE7F7] shadow-[0_24px_60px_-40px_rgba(0,122,255,0.5)] backdrop-blur-[20px]`}
      aria-label={name}
    >
      <span className="text-lg tracking-[-0.04em]">{getInitials(name)}</span>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
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
    <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_34px_90px_-54px_rgba(0,0,0,1)] backdrop-blur-[28px]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/[0.05]">
        <Inbox className="h-7 w-7 text-[#8EC5FF]" />
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-[#8A94A6]">{text}</p>
      <button
        onClick={onClick}
        className="mt-5 rounded-full bg-[#007AFF] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_42px_-18px_rgba(0,122,255,0.85)]"
      >
        {button}
      </button>
    </div>
  );
}

function NavButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: IconType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex min-w-0 flex-col items-center gap-1 rounded-[20px] px-1 py-2 transition-all duration-300 ${
        active ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
          active
            ? "border-[#007AFF]/25 bg-[#007AFF]/14 text-[#007AFF] shadow-[0_0_24px_rgba(0,122,255,0.28)]"
            : "border-transparent bg-transparent text-[#8A94A6] group-hover:text-white"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={`truncate text-[10px] font-medium ${
          active ? "text-white" : "text-[#8A94A6]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

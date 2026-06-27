import { useState, useEffect, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Country = { code: string; name: string; flag: string; dial: string };

const COUNTRIES: Country[] = [
  { code: 'ru', name: 'Россия', flag: '🇷🇺', dial: '+7' },
  { code: 'us', name: 'США', flag: '🇺🇸', dial: '+1' },
  { code: 'gb', name: 'Великобритания', flag: '🇬🇧', dial: '+44' },
  { code: 'de', name: 'Германия', flag: '🇩🇪', dial: '+49' },
  { code: 'fr', name: 'Франция', flag: '🇫🇷', dial: '+33' },
  { code: 'ua', name: 'Украина', flag: '🇺🇦', dial: '+380' },
  { code: 'kz', name: 'Казахстан', flag: '🇰🇿', dial: '+7' },
  { code: 'pl', name: 'Польша', flag: '🇵🇱', dial: '+48' },
  { code: 'es', name: 'Испания', flag: '🇪🇸', dial: '+34' },
  { code: 'it', name: 'Италия', flag: '🇮🇹', dial: '+39' },
  { code: 'tr', name: 'Турция', flag: '🇹🇷', dial: '+90' },
  { code: 'in', name: 'Индия', flag: '🇮🇳', dial: '+91' },
];

const SITES = ['Telegram', 'WhatsApp', 'Google', 'Instagram', 'VK', 'TikTok', 'Discord', 'Avito', 'Steam', 'Apple ID', 'Microsoft', 'Tinder', 'Uber', 'Amazon', 'PayPal'];

const rnd = (n: number) => Math.floor(Math.random() * n);
const genNumber = (c: Country) => `${c.dial} ${rnd(900) + 100} ${rnd(900) + 100}-${(rnd(90) + 10)}-${(rnd(90) + 10)}`;
const genCode = () => String(rnd(900000) + 100000);

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'countries', label: 'Страны' },
  { id: 'numbers', label: 'Номера' },
  { id: 'history', label: 'История' },
  { id: 'api', label: 'API' },
  { id: 'contacts', label: 'Контакты' },
];

const Index = () => {
  const [selected, setSelected] = useState<Country | null>(null);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [payNumber, setPayNumber] = useState<string | null>(null);
  const [activeNumber, setActiveNumber] = useState<{ num: string; country: Country } | null>(null);

  const openCountry = (c: Country) => {
    setSelected(c);
    setNumbers(Array.from({ length: 6 }, () => genNumber(c)));
    setTimeout(() => document.getElementById('numbers')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const scrollTo = (id: string) => {
    if (id === 'numbers' && !selected) { document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Aurora background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-[120px] animate-aurora" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-accent/20 blur-[120px] animate-aurora" style={{ animationDelay: '5s' }} />
        <div className="absolute top-[40%] left-[50%] w-[30rem] h-[30rem] rounded-full bg-cyan-500/20 blur-[120px] animate-aurora" style={{ animationDelay: '9s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 glass">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
              <Icon name="MessageSquareText" size={20} className="text-white" />
            </div>
            <span>Get<span className="gradient-text">SMS</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('countries')} className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:opacity-90">
            Начать
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="container pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Более 12 стран · мгновенная активация
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Приём СМС на<br /><span className="gradient-text">виртуальные номера</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Выбери страну, получи номер за 100 ₽ и принимай коды от любых сайтов. Анонимно, быстро и без SIM-карты.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <Button size="lg" onClick={() => scrollTo('countries')} className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:opacity-90 h-12 px-7 text-base glow">
            <Icon name="Globe" size={18} className="mr-2" /> Выбрать страну
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo('api')} className="h-12 px-7 text-base bg-transparent">
            <Icon name="Code2" size={18} className="mr-2" /> API для разработчиков
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-16">
          {[['98%', 'Доставка кодов'], ['12+', 'Стран'], ['24/7', 'Поддержка']].map(([v, l]) => (
            <div key={l} className="glass rounded-2xl p-5">
              <div className="font-display text-3xl font-bold gradient-text">{v}</div>
              <div className="text-sm text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section id="countries" className="container py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold">Выбери страну</h2>
            <p className="text-muted-foreground mt-2">Нажми на флаг, чтобы увидеть доступные номера</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {COUNTRIES.map((c, i) => (
            <button
              key={c.code}
              onClick={() => openCountry(c)}
              className={`glass rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:glow group ${selected?.code === c.code ? 'ring-2 ring-primary glow' : ''}`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{c.flag}</div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <span>{c.dial}</span>
                <Icon name="ArrowRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section id="numbers" className="container py-20">
        <h2 className="font-display text-4xl font-bold mb-2">
          {selected ? <>Номера · {selected.flag} {selected.name}</> : 'Доступные номера'}
        </h2>
        <p className="text-muted-foreground mb-10">
          {selected ? 'Каждый номер — 100 ₽. Нажми «Купить» для оплаты.' : 'Сначала выбери страну выше ↑'}
        </p>
        {selected && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {numbers.map((num, i) => (
              <div key={num + i} className="glass rounded-2xl p-6 flex flex-col gap-4 animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{selected.flag}</span>
                  <span className="text-xs glass px-2 py-1 rounded-full text-accent">Свободен</span>
                </div>
                <div className="font-display text-xl font-semibold tracking-wide">{num}</div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">100 ₽</span>
                  <Button size="sm" onClick={() => setPayNumber(num)} className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:opacity-90">
                    Купить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section id="history" className="container py-20">
        <h2 className="font-display text-4xl font-bold mb-2">История покупок</h2>
        <p className="text-muted-foreground mb-10">Все активированные номера хранятся в личном кабинете</p>
        <div className="glass rounded-2xl p-10 text-center">
          <Icon name="History" size={40} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Пока нет покупок. Купи первый номер — и он появится здесь.</p>
        </div>
      </section>

      {/* API */}
      <section id="api" className="container py-20">
        <div className="glass rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
              <Icon name="Code2" size={16} /> Для разработчиков
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">API для интеграции номеров</h2>
            <p className="text-muted-foreground mb-6">Подключи приём СМС к своему приложению за минуты. Простой REST API, ключ доступа и подробная документация.</p>
            <ul className="space-y-3 mb-8">
              {['Получение номера одним запросом', 'Вебхуки на входящие коды', 'Лимиты и статистика в реальном времени'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/20 grid place-items-center"><Icon name="Check" size={12} className="text-accent" /></span>
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
            <Button className="bg-gradient-to-r from-primary to-accent text-white border-0 hover:opacity-90">
              Получить API-ключ
            </Button>
          </div>
          <div className="rounded-2xl bg-[#0c0c16] border border-white/10 p-5 font-mono text-sm overflow-x-auto">
            <div className="flex gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <pre className="text-muted-foreground leading-relaxed">
<span className="text-accent">POST</span> /api/v1/numbers{'\n'}
<span className="text-primary">Authorization:</span> Bearer YOUR_KEY{'\n\n'}
{'{'}{'\n'}
{'  '}<span className="text-cyan-400">"country"</span>: <span className="text-green-400">"ru"</span>,{'\n'}
{'  '}<span className="text-cyan-400">"service"</span>: <span className="text-green-400">"telegram"</span>{'\n'}
{'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="container py-16 border-t border-white/10 mt-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                <Icon name="MessageSquareText" size={20} className="text-white" />
              </div>
              Get<span className="gradient-text">SMS</span>
            </div>
            <p className="text-sm text-muted-foreground">Виртуальные номера для приёма СМС со всего мира.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Icon name="Mail" size={15} /> support@getsms.io</li>
              <li className="flex items-center gap-2"><Icon name="Send" size={15} /> @getsms_support</li>
              <li className="flex items-center gap-2"><Icon name="Clock" size={15} /> Поддержка 24/7</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Разделы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => <li key={n.id}><button onClick={() => scrollTo(n.id)} className="hover:text-foreground transition-colors">{n.label}</button></li>)}
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-12">© 2024 GetSMS. Все права защищены.</p>
      </footer>

      {/* Payment dialog */}
      <PaymentDialog
        number={payNumber}
        country={selected}
        onClose={() => setPayNumber(null)}
        onPaid={(num) => { setPayNumber(null); if (selected) setActiveNumber({ num, country: selected }); }}
      />

      {/* Active number with codes */}
      <ActiveNumberDialog data={activeNumber} onClose={() => setActiveNumber(null)} />
    </div>
  );
};

function PaymentDialog({ number, country, onClose, onPaid }: { number: string | null; country: Country | null; onClose: () => void; onPaid: (n: string) => void }) {
  const [processing, setProcessing] = useState(false);
  const pay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); if (number) onPaid(number); }, 1600);
  };
  return (
    <Dialog open={!!number} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Оплата номера</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{country?.flag} {country?.name}</div>
              <div className="font-display font-semibold text-lg">{number}</div>
            </div>
            <div className="font-bold text-xl">100 ₽</div>
          </div>
          <div className="space-y-3">
            <Input placeholder="Номер карты" defaultValue="" inputMode="numeric" className="bg-input/50" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="ММ / ГГ" className="bg-input/50" />
              <Input placeholder="CVC" inputMode="numeric" className="bg-input/50" />
            </div>
            <Input placeholder="Имя на карте" className="bg-input/50" />
          </div>
          <Button onClick={pay} disabled={processing} className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white border-0 hover:opacity-90 text-base">
            {processing ? <><Icon name="Loader2" size={18} className="mr-2 animate-spin" /> Обработка…</> : <><Icon name="Lock" size={16} className="mr-2" /> Оплатить 100 ₽</>}
          </Button>
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Icon name="ShieldCheck" size={13} /> Безопасная оплата · данные защищены
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ActiveNumberDialog({ data, onClose }: { data: { num: string; country: Country } | null; onClose: () => void }) {
  const codes = useMemo(
    () => Array.from({ length: 12 }, () => ({ site: SITES[rnd(SITES.length)], code: genCode() })),
    [data?.num]
  );
  const [live, setLive] = useState<{ site: string; code: string } | null>(null);

  useEffect(() => {
    if (!data) return;
    const t = setInterval(() => setLive({ site: SITES[rnd(SITES.length)], code: genCode() }), 2500);
    return () => clearInterval(t);
  }, [data]);

  return (
    <Dialog open={!!data} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Icon name="CheckCircle2" size={24} className="text-accent" /> Номер активирован
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-primary/20 to-accent/10 border border-white/10">
            <div className="text-sm text-muted-foreground mb-1">{data?.country.flag} {data?.country.name}</div>
            <div className="font-display text-3xl font-bold tracking-wide">{data?.num}</div>
          </div>

          {live && (
            <div className="glass rounded-xl p-4 flex items-center gap-3 animate-scale-in">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Новый код от <b className="text-foreground">{live.site}</b>:</span>
              <span className="font-display font-bold text-lg ml-auto text-accent">{live.code}</span>
            </div>
          )}

          <div>
            <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <Icon name="Radio" size={15} /> Входящие коды в реальном времени
            </div>
            <div className="space-y-2 overflow-hidden rounded-xl glass p-3">
              {[0, 1].map((row) => (
                <div key={row} className="overflow-hidden whitespace-nowrap">
                  <div className="ticker-track" style={{ animationDuration: `${22 + row * 6}s`, animationDirection: row ? 'reverse' : 'normal' }}>
                    {[...codes, ...codes].map((c, i) => (
                      <span key={i} className="inline-flex items-center gap-2 mx-2 text-sm">
                        <span className="text-muted-foreground">{c.site}</span>
                        <span className="font-display font-semibold text-foreground bg-white/5 px-2 py-0.5 rounded-md">{c.code}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">Коды приходят автоматически. Не закрывай окно, чтобы видеть новые сообщения.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Index;

import { useState } from 'react';

type Mode = 'day' | 'night';
type Role = 'Jugador' | 'Cupido' | null;

export default function App() {
  const [mode, setMode] = useState<Mode>('day');
  const [role, setRole] = useState<Role>(null);
  return (
    <main className={`app ${mode}`}>
      <div className="shell">
        <header className="top"><strong className="brand">tiki<span>taka.</span></strong><button type="button" className="mode" aria-label={`Cambiar a modo ${mode === 'day' ? 'noche' : 'día'}`} onClick={() => setMode(mode === 'day' ? 'night' : 'day')}>{mode === 'day' ? '☀️ Día · Cambiar a noche' : '🌙 Noche · Cambiar a día'}</button></header>
        <section className="intro"><span className="eyebrow">CONCEPTO INICIAL · SOLO DEMOSTRACIÓN</span><h1>La conexión empieza <em>jugando.</em></h1><p>De día conectas. De noche salen nuevos planes. Elige cómo quieres participar.</p></section>
        <div className="cards"><button className={`choice ${role === 'Jugador' ? 'active' : ''}`} type="button" onClick={() => setRole('Jugador')}><span className="symbol" aria-hidden="true">❤️‍🔥</span><strong>Jugador</strong><small>Descubre conexiones y planes</small></button><button className={`choice ${role === 'Cupido' ? 'active' : ''}`} type="button" onClick={() => setRole('Cupido')}><span className="symbol" aria-hidden="true">🏹</span><strong>Cupido</strong><small>Presenta amigos con su permiso</small></button></div>
        <div className="message" role="status">{role ? `Modo ${role} seleccionado. Próximamente: experiencia interactiva.` : 'Selecciona un papel para comenzar la demostración.'}</div>
        <footer>Prototipo visual · Sin cuentas ni perfiles reales · Solo adultos (18+)</footer>
      </div>
    </main>
  );
}

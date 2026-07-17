// ===== las principales religiones del mundo — datos =====
const RELIGIONS = [
  {
    id: "christianity", name: "Cristianismo", emoji: "✝️", tagline: "Rescate por gracia",
    adherents: "~2,400 millones", founded: "c. 30 d.C. · Judea", founder: "Jesús de Nazaret",
    origins: "Comenzó como un movimiento mesiánico judío en la Judea romana cuando los seguidores de Jesús proclamaron su resurrección. Se separó de la sinagoga en una generación, sobrevivió tres siglos de persecución y abarcó el Imperio romano antes de que Constantino lo legalizara en el 313 d.C.",
    scripture: "La Biblia — Antiguo y Nuevo Testamento (66 libros)",
    god: "Un Dios en tres personas (Trinidad) — personal y relacional; \"Dios es amor\" (1 Juan 4:8).",
    problem: "El pecado — rebelión moral que separa a cada persona de un Dios santo.",
    path: "Gracia: perdón mediante la muerte y resurrección de Jesús, recibido por fe, no ganado (Ef. 2:8–9).",
    afterlife: "Resurrección corporal y juicio final; vida eterna con Dios, o separación de él.",
    practices: "Adoración, oración, bautismo, comunión, lectura de la Escritura, generosidad.",
    branches: "Católicos (~1,300M), protestantes (~900M), ortodoxos (~220M)."
  },
  {
    id: "islam", name: "Islam", emoji: "☪️", tagline: "Sumisión a Alá",
    adherents: "~2,000 millones", founded: "610 d.C. · La Meca, Arabia", founder: "Mahoma (570–632)",
    origins: "Mahoma, un mercader de La Meca, relató revelaciones del ángel Gabriel a partir del 610 d.C. Tras la huida a Medina (622) el movimiento unificó Arabia; a un siglo de su muerte, las conquistas árabes lo llevaron de España al Indo.",
    scripture: "El Corán; las colecciones de hadices",
    god: "Un Dios (Alá), unidad absoluta (tawhid) — creador y juez trascendente; la Trinidad y la encarnación se niegan.",
    problem: "No caído sino débil y olvidadizo — el fracaso en someterse a la voluntad de Alá; sin pecado original.",
    path: "Los Cinco Pilares — confesión, oración, limosna, ayuno, peregrinación — con las obras pesadas en el juicio.",
    afterlife: "Resurrección y juicio; el Paraíso (Yanna) o el Infierno (Yahannam) según la balanza y el decreto de Alá.",
    practices: "Cinco oraciones diarias (salat), ayuno de Ramadán, zakat, vida halal, culto en la mezquita.",
    branches: "Suníes (~85–90%), chiíes (~10–13%), órdenes sufíes en ambos."
  },
  {
    id: "hinduism", name: "Hinduismo", emoji: "🕉️", tagline: "Liberación (moksha)",
    adherents: "~1,200 millones", founded: "c. 2300–1500 a.C. · Valle del Indo", founder: "Ninguno — creció de la tradición védica",
    origins: "Sin momento fundacional: la religión védica indoaria se fusionó con tradiciones indias autóctonas desde c. 1500 a.C., estratificada durante milenios por los Upanishads, las épicas y los movimientos devocionales (bhakti) medievales.",
    scripture: "Vedas, Upanishads, Bhagavad Gita, las épicas",
    god: "Brahman, la realidad suprema, expresada en muchas deidades — Visnú, Shiva, Devi y otras.",
    problem: "La ignorancia (avidyā) y el karma atan el alma (atman) al samsara, el ciclo de renacimiento.",
    path: "Los yogas — devoción (bhakti), conocimiento (jñana), acción (karma), meditación (raja) — hacia moksha.",
    afterlife: "Reencarnación según el karma hasta la liberación (moksha).",
    practices: "Puya, culto en el templo, festivales (Diwali, Holi), peregrinación, yoga y meditación.",
    branches: "Visnuismo, shivaísmo, shaktismo, smartismo."
  },
  {
    id: "buddhism", name: "Budismo", emoji: "☸️", tagline: "Cesación (nirvana)",
    adherents: "~500 millones", founded: "c. siglo V a.C. · norte de la India", founder: "Siddhartha Gautama, el Buda",
    origins: "El príncipe Siddhartha Gautama dejó la vida de palacio para buscar el fin del sufrimiento, alcanzó la iluminación en Bodh Gaya y enseñó durante cuarenta y cinco años. Las órdenes monásticas y el patrocinio del emperador Ashoka (siglo III a.C.) llevaron el camino por toda Asia.",
    scripture: "Canon Pali (Tripitaka); sutras mahayana",
    god: "Sin Dios creador — las preguntas últimas se dejan de lado en favor del camino al despertar.",
    problem: "El sufrimiento (dukkha), causado por el anhelo y el apego.",
    path: "Las Cuatro Nobles Verdades y el Noble Óctuple Sendero — extinguir el anhelo.",
    afterlife: "Renacimiento impulsado por el karma hasta el nirvana, la cesación del ciclo.",
    practices: "Meditación, atención plena, preceptos éticos, comunidad monástica (sangha).",
    branches: "Theravada, mahayana, vajrayana (tibetano), zen."
  },
  {
    id: "judaism", name: "Judaísmo", emoji: "✡️", tagline: "Fidelidad al pacto",
    adherents: "~15 millones", founded: "c. 2000–1300 a.C. · Canaán y Sinaí", founder: "Abraham (pacto), Moisés (Torá)",
    origins: "Arraigado en el pacto de Dios con Abraham y el éxodo bajo Moisés, moldeado por la ley del Sinaí, los profetas y el exilio — y refundido como judaísmo rabínico después de que Roma destruyera el Segundo Templo en el 70 d.C.",
    scripture: "Tanaj (Torá, Profetas, Escritos); Talmud",
    god: "Un Dios, personal y de pacto — \"Oye, Israel: el SEÑOR nuestro Dios, el SEÑOR uno es\" (Dt. 6:4).",
    problem: "El pecado como ruptura del pacto con Dios.",
    path: "Arrepentimiento (teshuvá), observancia de la Torá, oración y obras de bondad.",
    afterlife: "Las visiones varían — el mundo venidero (Olam Habá), la resurrección en la era mesiánica.",
    practices: "Sábado, leyes kosher, festivales, culto en la sinagoga, estudio.",
    branches: "Ortodoxos, conservadores, reformistas, reconstruccionistas."
  },
  {
    id: "sikhism", name: "Sijismo", emoji: "🪯", tagline: "Un Dios, vida honesta",
    adherents: "~26 millones", founded: "1499 d.C. · Punyab, India", founder: "Gurú Nanak (1469–1539), seguido de nueve gurús",
    origins: "En el Punyab, entre los mundos hindú y musulmán, el gurú Nanak emergió de una experiencia reveladora declarando \"no hay hindú, no hay musulmán\". Nueve gurús sucesores edificaron la comunidad; el décimo, Gobind Singh, fundó la Khalsa (1699) y selló el Guru Granth Sahib como el Gurú final y eterno.",
    scripture: "Guru Granth Sahib — venerado como el Gurú eterno y viviente",
    god: "Un creador sin forma (Ik Onkar, Waheguru), más allá de imagen y género, presente por igual en todas las personas.",
    problem: "El ego (haumai) y el apego separan el alma de Dios a través de ciclos de renacimiento.",
    path: "Recordar el nombre de Dios (naam japna), ganarse la vida honestamente (kirat karo), compartir con otros (vand chhako).",
    afterlife: "Reencarnación hasta que el alma se funde con Dios.",
    practices: "Las Cinco K, oraciones diarias, langar (la cocina comunitaria gratuita abierta a todos), culto en el gurdwara.",
    branches: "Tradición Khalsa; varias sampradayas menores."
  },
  {
    id: "bahai", name: "Fe bahaí", emoji: "✴️", tagline: "Un Dios, una familia humana",
    adherents: "~5–8 millones", founded: "1863 d.C. · Persia (Irán)", founder: "Bahá'u'lláh (1817–1892)",
    origins: "Creció del movimiento babí de Persia (1844), que esperaba a un prometido. Bahá'u'lláh, un noble babí, se declaró esa figura en Bagdad en 1863; sus escritos desde la prisión y el exilio en Acre se volvieron la escritura de la fe, y sus descendientes la organizaron por el mundo.",
    scripture: "El Kitáb-i-Aqdas y los escritos de Bahá'u'lláh",
    god: "Un Dios incognoscible, revelado progresivamente por Mensajeros — Abraham, Moisés, Buda, Jesús, Mahoma, Bahá'u'lláh.",
    problem: "La desunión y la inmadurez espiritual de la humanidad.",
    path: "Reconocer al Mensajero de Dios para esta era; orar, servir y trabajar por la unidad del género humano.",
    afterlife: "El alma viaja eternamente hacia Dios — cielo e infierno como cercanía y lejanía.",
    practices: "Oración diaria, un ayuno anual de 19 días, servicio a la humanidad; sin clero.",
    branches: "Administrativamente unificada en el mundo; sin sectas mayores."
  },
  {
    id: "jainism", name: "Jainismo", emoji: "🤚", tagline: "La no violencia ante todo",
    adherents: "~4–5 millones", founded: "c. siglo VI a.C. · India (la tradición lo considera eterno)", founder: "Mahavira, el 24.º Tirthankara",
    origins: "Mahavira, contemporáneo del Buda, renunció a la vida principesca a los treinta y sistematizó la corriente ascética (śramaṇa), mucho más antigua, de la religión india, convirtiéndose en el 24.º y último \"hacedor de vados\" (Tirthankara) de esta era cósmica.",
    scripture: "Los Agamas",
    god: "Sin Dios creador — las almas liberadas (jinas) se veneran como ejemplos, no se adoran como deidades.",
    problem: "El karma — materia sutil que se adhiere al alma (yiva) mediante la violencia y la pasión.",
    path: "Las Tres Joyas — recta fe, recto conocimiento, recta conducta — ancladas en el ahimsa (no violencia).",
    afterlife: "Renacimiento hasta que el alma se despoja de todo karma y asciende a la liberación (moksha).",
    practices: "Vegetarianismo estricto, ayuno, meditación, ascetismo monástico.",
    branches: "Digambara, śvētāmbara."
  },
  {
    id: "zoroastrianism", name: "Zoroastrismo", emoji: "🔥", tagline: "Buenos pensamientos, palabras, obras",
    adherents: "~110,000–125,000", founded: "c. 1200–1000 a.C. · Persia antigua", founder: "Zaratustra (Zoroastro)",
    origins: "El sacerdote-profeta Zaratustra refundió la antigua religión irania en torno a un Señor sabio, Ahura Mazda. Fue la fe de tres imperios persas antes de que la conquista islámica la redujera a un remanente, parte del cual huyó a la India — los parsis de hoy.",
    scripture: "El Avesta",
    god: "Ahura Mazda, el Señor Sabio, opuesto por el espíritu destructor Angra Mainyu — un dualismo moral cósmico.",
    problem: "La lucha entre la verdad (asha) y la mentira (druj), librada en cada corazón humano.",
    path: "Elegir el bien: buenos pensamientos, buenas palabras, buenas obras.",
    afterlife: "El alma cruza el puente Chinvat hacia la recompensa o el tormento; una renovación final (Frashokereti) restaura todo.",
    practices: "Culto en templos del fuego, ritos de pureza, festivales estacionales (Nowruz).",
    branches: "Parsis (India), zoroastrianos iraníes."
  },
  {
    id: "taoism", name: "Taoísmo", emoji: "☯️", tagline: "Fluir con el Camino",
    adherents: "~12–20 millones (alcance cultural mucho mayor)", founded: "c. siglos VI–IV a.C. · China", founder: "Laozi (tradicional); Zhuangzi",
    origins: "Cristalizó en la turbulenta era de los Reinos Combatientes de China en torno al Tao Te Ching (atribuido a Laozi) y el Zhuangzi. El taoísmo religioso organizado comenzó con el movimiento de los Maestros Celestiales de Zhang Daoling (142 d.C.).",
    scripture: "Tao Te Ching, Zhuangzi",
    god: "El Tao — la fuente y el patrón sin nombre de todas las cosas; el taoísmo religioso añade un rico panteón.",
    problem: "Luchar contra el camino natural produce desorden y agotamiento.",
    path: "Wu wei — acción no forzada en armonía con el Tao; sencillez, humildad, espontaneidad.",
    afterlife: "Variada — cultivo de la inmortalidad en el taoísmo religioso, continuidad ancestral en la práctica popular.",
    practices: "Meditación, qigong y tai chi, ritual en el templo, feng shui.",
    branches: "Filosófico (daojia) y religioso (daojiao); Quanzhen, Zhengyi."
  },
  {
    id: "confucianism", name: "Confucianismo", emoji: "📜", tagline: "Virtud, familia, armonía",
    adherents: "~6 millones formales; influencia cultural sobre mil millones", founded: "551–479 a.C. · China", founder: "Confucio (Kong Fuzi)",
    origins: "Confucio, un funcionario menor del estado de Lu en una era de desorden, enseñó el retorno a la virtud, el rito y las relaciones correctas; sus discípulos compilaron las Analectas. La dinastía Han hizo de su enseñanza la ortodoxia estatal (siglo II a.C.), moldeando el Asia oriental durante dos milenios.",
    scripture: "Las Analectas; los Cinco Clásicos",
    god: "Tian (el Cielo) como orden moral — más una forma ética de vida que una teología.",
    problem: "El desorden social arraigado en la virtud fallida y las relaciones rotas.",
    path: "Cultivar la benevolencia (ren) y la propiedad (li); honrar las cinco relaciones, empezando por la familia.",
    afterlife: "Poca especulación — honra a los ancestros y vive rectamente ahora.",
    practices: "Veneración de los ancestros, propiedad ritual, estudio, autocultivo.",
    branches: "Confucianismo clásico, neoconfucianismo."
  },
  {
    id: "shinto", name: "Sintoísmo", emoji: "⛩️", tagline: "El camino de los kami",
    adherents: "~3–4 millones comprometidos; la mayoría de Japón participa culturalmente", founded: "Prehistórico · Japón", founder: "Ninguno",
    origins: "Se formó de la veneración prehistórica japonesa de los kami en la naturaleza y de los ancestros del clan. Fue nombrado \"shinto\" — el camino de los kami — para distinguirlo del budismo recién llegado (siglo VI d.C.), y sus mitos se codificaron en las crónicas Kojiki (712 d.C.).",
    scripture: "Kojiki y Nihon Shoki (crónicas más que escritura propiamente)",
    god: "Incontables kami — presencias sagradas en la naturaleza, los ancestros y los lugares.",
    problem: "La impureza (kegare) más que el pecado.",
    path: "Purificación (harae), sinceridad (makoto) y reverencia hacia los kami.",
    afterlife: "Se deja vago — los muertos pueden volverse kami ancestrales que velan por los vivos.",
    practices: "Visitas a santuarios, festivales (matsuri), ritos de paso, puertas torii que marcan el espacio sagrado.",
    branches: "Sintoísmo de santuario, sintoísmo de secta, práctica popular."
  },
  {
    id: "indigenous", name: "Religiones indígenas y populares", emoji: "🌍", tagline: "Los caminos más antiguos",
    adherents: "~300–400 millones en el mundo", founded: "Prehistórico · todos los continentes habitados", founder: "Ninguno — transmitidas oralmente entre generaciones",
    origins: "Más antiguas que la escritura en todos los continentes habitados — llevadas en mito, canto y ceremonia de generación en generación, adaptándose a través de la migración, el contacto y la colonización hasta el presente.",
    scripture: "Tradición oral — mito, canto y ceremonia",
    god: "Típicamente un alto creador junto a espíritus y ancestros que animan el mundo viviente.",
    problem: "La armonía rota con el mundo espiritual, los ancestros o la comunidad.",
    path: "El rito, la ceremonia, la veneración ancestral y la obligación comunitaria restauran el equilibrio.",
    afterlife: "El reino ancestral — los muertos siguen siendo parte de la vida de la comunidad.",
    practices: "Ritos de paso, adivinación, ceremonias de sanación, festivales estacionales.",
    branches: "Miles de tradiciones distintas — yoruba, lakota, shona, maorí, religión popular china y más."
  },
  {
    id: "lds", name: "Santos de los Últimos Días (mormonismo)", emoji: "📖", tagline: "La Restauración",
    adherents: "~17 millones", founded: "1830 d.C. · Nueva York, EE. UU.", founder: "José Smith (1805–1844)",
    origins: "Nació en el \"distrito quemado\" del norte de Nueva York, barrido por los avivamientos del Segundo Gran Despertar. José Smith relató su Primera Visión (1820) y las visitas del ángel Moroni que lo llevaron a unas planchas de oro; el Libro de Mormón y una nueva iglesia siguieron en 1830, y Brigham Young condujo el movimiento a Utah tras la muerte de Smith en 1844.",
    scripture: "La Biblia (\"hasta donde esté traducida correctamente\"), el Libro de Mormón, Doctrina y Convenios, la Perla de Gran Precio — más un profeta viviente",
    god: "El Padre, el Hijo y el Espíritu Santo como tres seres distintos, uno en propósito. El Padre tiene un cuerpo físico glorificado (D&C 130:22), y los humanos fieles pueden progresar hacia la exaltación — \"Como el hombre es, Dios una vez fue; como Dios es, el hombre puede llegar a ser\" (Lorenzo Snow). El cristianismo dominante rechaza esta visión de Dios.",
    problem: "La Caída (vista como paso necesario) y el pecado individual; la vida mortal es una prueba dentro de una progresión eterna.",
    path: "Fe en Cristo, arrepentimiento, bautismo por autoridad del sacerdocio restaurado, ordenanzas y convenios del templo, y perseverar hasta el fin — \"por la gracia somos salvos, después de hacer cuanto podamos\" (2 Nefi 25:23).",
    afterlife: "Casi todos reciben uno de tres reinos de gloria — celestial, terrestre o telestial; la exaltación en el reino celestial para los fieles; las tinieblas exteriores solo para raros \"hijos de perdición\".",
    practices: "Reuniones sacramentales, culto en el templo, bautismo por los muertos, misiones de dos años, diezmo, la Palabra de Sabiduría (sin café, té, alcohol ni tabaco).",
    branches: "La Iglesia SUD (la mayor, Salt Lake City); Comunidad de Cristo."
  },
  {
    id: "jw", name: "Testigos de Jehová", emoji: "🗼", tagline: "La organización de Jehová",
    adherents: "~8.7 millones de publicadores activos", founded: "Década de 1870 · Pittsburgh, EE. UU.", founder: "Charles Taze Russell; remodelada bajo Joseph Rutherford",
    origins: "Surgió del círculo de estudio bíblico de Charles Taze Russell en el Pittsburgh de los 1870, en medio de la expectativa adventista del fin. Incorporada como la Sociedad Watch Tower (1881), fue reorganizada bajo Joseph Rutherford, que renombró el movimiento testigos de Jehová en 1931.",
    scripture: "La Biblia en la Traducción del Nuevo Mundo propia de la Watchtower, leída a través de sus publicaciones",
    god: "Solo Jehová es el Dios Todopoderoso. La Trinidad se rechaza: Jesús es la primera creación de Jehová (identificado con el arcángel Miguel), y el espíritu santo es la fuerza activa impersonal de Dios.",
    problem: "El pecado adámico trajo imperfección y muerte; Satanás gobierna actualmente los sistemas del mundo.",
    path: "Ejercer fe en Jehová y en el rescate de Cristo, predicar de casa en casa, y permanecer leal a la organización visible de Jehová dirigida por el Cuerpo Gobernante.",
    afterlife: "144,000 \"ungidos\" reinan con Cristo en el cielo; las fieles \"otras ovejas\" viven para siempre en una tierra paradisíaca restaurada. Sin alma inmortal ni infierno — los malvados son aniquilados.",
    practices: "Testimonio puerta a puerta, reuniones en el Salón del Reino, la Conmemoración anual; sin cumpleaños, festividades, servicio militar ni transfusiones de sangre.",
    branches: "Gobernados centralmente desde Warwick, NY; sin denominaciones."
  },
  {
    id: "scientology", name: "Cienciología", emoji: "🔺", tagline: "El Puente a la Libertad Total",
    adherents: "Disputado — de decenas de miles a unos cientos de miles", founded: "1954 · Los Ángeles, EE. UU.", founder: "L. Ron Hubbard (1911–1986)",
    origins: "El escritor de ciencia ficción L. Ron Hubbard publicó el sistema de autoayuda Dianética en 1950, y luego lo reorganizó como religión, fundando la Iglesia de la Cienciología en 1954. Creció mediante el apoyo de celebridades y una expansión agresiva, y sigue siendo controvertida — reconocida como religión en algunos países, disputada en otros.",
    scripture: "Los escritos y conferencias de Hubbard — Dianética, el canon de la cienciología y los materiales confidenciales de nivel superior (OT)",
    god: "Sin Dios personal definido — la \"Octava Dinámica\" (el infinito) se deja para que cada persona la alcance; toda persona es un thetán, un ser espiritual inmortal de billones de años.",
    problem: "Los engramas — grabaciones mentales traumáticas de esta vida e incontables vidas pasadas — nublan al thetán y bloquean su potencial nativo.",
    path: "Auditación con un E-metro para borrar engramas, subiendo el \"Puente a la Libertad Total\" desde \"Clear\" por los niveles de Thetán Operante — cada etapa comprada como cursos.",
    afterlife: "El thetán suelta el cuerpo y toma uno nuevo — un ciclo continuo de renacimiento; sin cielo ni infierno.",
    practices: "Sesiones de auditación, cursos de formación, programas de ética, servicio de personal o en la Sea Org.",
    branches: "Iglesia de la Cienciología; cienciólogos independientes de la \"Zona Libre\"."
  },
  {
    id: "atheism", name: "Ateísmo y humanismo secular", emoji: "⚛️", tagline: "Sin dios, sentido propio",
    adherents: "~1,200 millones sin afiliación religiosa", founded: "Raíces antiguas (Epicuro, Cārvāka); forma moderna desde la Ilustración", founder: "Ninguno — una corriente de pensadores de Epicuro a los Nuevos Ateos",
    origins: "Corrientes minoritarias antiguas (Epicuro en Grecia, Cārvāka en la India) se volvieron una opción masiva mediante la Ilustración, Darwin y la secularización de Europa en los siglos XIX–XX; el \"Nuevo Ateísmo\" de Dawkins, Hitchens, Harris y Dennett le dio nueva voz pública después de 2001.",
    scripture: "Ninguna — la ciencia y la razón como guías de confianza",
    god: "Ninguno. El universo natural es todo lo que hay, fue o será.",
    problem: "La ignorancia, la superstición y las sociedades mal organizadas.",
    path: "Razón, ciencia, ética secular y florecimiento humano; el sentido se construye, no se encuentra.",
    afterlife: "Ninguna — la muerte es el fin permanente de la conciencia.",
    practices: "Ninguna prescrita — comunidades humanistas, ceremonias seculares, vida cívica.",
    branches: "Ateísmo, agnosticismo, humanismo secular, los \"nones\" sin afiliación."
  }
];

const FIELDS = [
  ["adherents", "Adeptos"],
  ["founded", "Fundación"],
  ["founder", "Fundador"],
  ["origins", "Cómo comenzó"],
  ["god", "Dios / realidad última"],
  ["scripture", "Escritura"],
  ["problem", "Problema humano"],
  ["path", "El camino"],
  ["afterlife", "La otra vida"],
  ["practices", "Prácticas"],
  ["branches", "Ramas principales"]
];

// ===== cuadrícula de todas las religiones + modal de detalle =====
const relGrid = document.getElementById('religionGrid');
const relModal = document.getElementById('relModal');
const relModalBody = document.getElementById('modalBody');

RELIGIONS.forEach(r => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'tile';
  card.innerHTML = `<img src="../img/${r.id}.jpg" alt="${r.name}" loading="lazy">` +
    `<div class="tile-body"><div class="t-tag">${r.tagline}</div>` +
    `<h3><span class="t-emoji">${r.emoji}</span> ${r.name}</h3>` +
    `<p>${r.god}</p>` +
    `<span class="meta">${r.adherents} · ${r.founded.split('·')[0].trim()}</span>` +
    `<span class="t-go">Abrir el perfil completo →</span></div>`;
  card.addEventListener('click', () => openRelModal(r));
  relGrid.appendChild(card);
});

function openRelModal(r) {
  relModalBody.innerHTML = `<div class="m-hero"><img src="../img/${r.id}.jpg" alt="${r.name}"></div>` +
    `<span class="m-emoji">${r.emoji}</span><h3>${r.name}</h3>` +
    `<div class="m-tagline">${r.tagline} · ${r.adherents}</div><dl>` +
    FIELDS.map(([k, label]) => `<div><dt>${label}</dt><dd>${r[k]}</dd></div>`).join('') +
    `</dl>`;
  relModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeRelModal() {
  relModal.hidden = true;
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeRelModal);
relModal.addEventListener('click', e => { if (e.target === relModal) closeRelModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !relModal.hidden) closeRelModal(); });

// ===== laboratorio de comparación (elige 2–5, míralas lado a lado) =====
const MIN_PICK = 2, MAX_PICK = 5;
const picked = new Set(['christianity', 'islam', 'hinduism']);
const chipsBox = document.getElementById('compareChips');
const compareHint = document.getElementById('compareHint');
const compareOut = document.getElementById('compareOut');
const compareTable = document.getElementById('compareTable');
let hintTimer = null;

RELIGIONS.forEach(r => {
  const b = document.createElement('button');
  b.className = 'toggle' + (picked.has(r.id) ? ' active' : '');
  b.textContent = `${r.emoji} ${r.name}`;
  b.addEventListener('click', () => {
    if (picked.has(r.id)) {
      picked.delete(r.id);
    } else if (picked.size >= MAX_PICK) {
      flashHint(`Hasta ${MAX_PICK} a la vez — deselecciona una primero.`);
      return;
    } else {
      picked.add(r.id);
    }
    b.classList.toggle('active', picked.has(r.id));
    renderCompare();
  });
  chipsBox.appendChild(b);
});

function flashHint(msg) {
  compareHint.textContent = msg;
  compareHint.classList.add('warn');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { compareHint.classList.remove('warn'); setHint(); }, 2400);
}
function setHint() {
  compareHint.textContent = picked.size < MIN_PICK
    ? `Elige ${MIN_PICK - picked.size} más — el laboratorio compara de ${MIN_PICK} a ${MAX_PICK} tradiciones a la vez.`
    : `Comparando ${picked.size} tradiciones. Toca las fichas para cambiar (${MIN_PICK}–${MAX_PICK}).`;
}
function renderCompare() {
  setHint();
  if (picked.size < MIN_PICK) { compareOut.hidden = true; return; }
  const sel = RELIGIONS.filter(r => picked.has(r.id));
  compareTable.innerHTML =
    '<thead><tr><th></th>' + sel.map(r => `<th>${r.emoji} ${r.name}</th>`).join('') + '</tr></thead>' +
    '<tbody>' + FIELDS.map(([k, label]) =>
      `<tr><th>${label}</th>` + sel.map(r => `<td>${r[k]}</td>`).join('') + '</tr>'
    ).join('') + '</tbody>';
  compareOut.hidden = false;
}
renderCompare();

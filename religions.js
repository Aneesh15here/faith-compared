// ===== the world's major religions — data =====
const RELIGIONS = [
  {
    id: "christianity", name: "Christianity", emoji: "✝️", tagline: "Rescue by grace",
    adherents: "~2.4 billion", founded: "c. AD 30 · Judea", founder: "Jesus of Nazareth",
    scripture: "The Bible — Old & New Testaments (66 books)",
    god: "One God in three persons (Trinity) — personal and relational; \"God is love\" (1 John 4:8).",
    problem: "Sin — moral rebellion that separates every person from a holy God.",
    path: "Grace: forgiveness through Jesus' death and resurrection, received by faith, not earned (Eph. 2:8–9).",
    afterlife: "Bodily resurrection and final judgment; eternal life with God, or separation from him.",
    practices: "Worship, prayer, baptism, communion, Scripture reading, generosity.",
    branches: "Catholic (~1.3B), Protestant (~900M), Orthodox (~220M)."
  },
  {
    id: "islam", name: "Islam", emoji: "☪️", tagline: "Submission to Allah",
    adherents: "~2.0 billion", founded: "AD 610 · Mecca, Arabia", founder: "Muhammad (570–632)",
    scripture: "The Quran; the Hadith collections",
    god: "One God (Allah), an absolute unity (tawhid) — transcendent creator and judge; Trinity and incarnation denied.",
    problem: "Not fallen but weak and forgetful — failure to submit to Allah's will; no original sin.",
    path: "The Five Pillars — confession, prayer, almsgiving, fasting, pilgrimage — with deeds weighed at judgment.",
    afterlife: "Resurrection and judgment; Paradise (Jannah) or Hell (Jahannam) by the scales and Allah's decree.",
    practices: "Five daily prayers (salat), Ramadan fast, zakat, halal living, mosque worship.",
    branches: "Sunni (~85–90%), Shia (~10–13%), Sufi orders within both."
  },
  {
    id: "hinduism", name: "Hinduism", emoji: "🕉️", tagline: "Liberation (moksha)",
    adherents: "~1.2 billion", founded: "c. 2300–1500 BC · Indus Valley", founder: "None — grew from the Vedic tradition",
    scripture: "Vedas, Upanishads, Bhagavad Gita, the epics",
    god: "Brahman, the supreme reality, expressed through many deities — Vishnu, Shiva, Devi, and others.",
    problem: "Ignorance (avidya) and karma bind the soul (atman) to samsara, the cycle of rebirth.",
    path: "The yogas — devotion (bhakti), knowledge (jnana), action (karma), meditation (raja) — toward moksha.",
    afterlife: "Reincarnation according to karma until liberation (moksha).",
    practices: "Puja, temple worship, festivals (Diwali, Holi), pilgrimage, yoga and meditation.",
    branches: "Vaishnavism, Shaivism, Shaktism, Smartism."
  },
  {
    id: "buddhism", name: "Buddhism", emoji: "☸️", tagline: "Cessation (nirvana)",
    adherents: "~500 million", founded: "c. 5th century BC · northern India", founder: "Siddhartha Gautama, the Buddha",
    scripture: "Pali Canon (Tripitaka); Mahayana sutras",
    god: "No creator God — ultimate questions are set aside in favor of the path to awakening.",
    problem: "Suffering (dukkha), caused by craving and attachment.",
    path: "The Four Noble Truths and the Noble Eightfold Path — extinguishing craving.",
    afterlife: "Rebirth driven by karma until nirvana, the cessation of the cycle.",
    practices: "Meditation, mindfulness, ethical precepts, monastic community (sangha).",
    branches: "Theravada, Mahayana, Vajrayana (Tibetan), Zen."
  },
  {
    id: "judaism", name: "Judaism", emoji: "✡️", tagline: "Covenant faithfulness",
    adherents: "~15 million", founded: "c. 2000–1300 BC · Canaan & Sinai", founder: "Abraham (covenant), Moses (Torah)",
    scripture: "Tanakh (Torah, Prophets, Writings); Talmud",
    god: "One God, personal and covenantal — \"Hear, O Israel: the LORD our God, the LORD is one\" (Deut. 6:4).",
    problem: "Sin as breaking covenant with God.",
    path: "Repentance (teshuvah), Torah observance, prayer, and deeds of loving-kindness.",
    afterlife: "Views vary — the world to come (Olam Ha-Ba), resurrection in the Messianic age.",
    practices: "Sabbath, kosher laws, festivals, synagogue worship, study.",
    branches: "Orthodox, Conservative, Reform, Reconstructionist."
  },
  {
    id: "sikhism", name: "Sikhism", emoji: "🪯", tagline: "One God, honest living",
    adherents: "~26 million", founded: "AD 1499 · Punjab, India", founder: "Guru Nanak (1469–1539), followed by nine Gurus",
    scripture: "Guru Granth Sahib — revered as the eternal, living Guru",
    god: "One formless creator (Ik Onkar, Waheguru), beyond image and gender, present in all people equally.",
    problem: "Ego (haumai) and attachment separate the soul from God through cycles of rebirth.",
    path: "Remember God's name (naam japna), earn an honest living (kirat karo), share with others (vand chhako).",
    afterlife: "Reincarnation until the soul merges with God.",
    practices: "The Five Ks, daily prayers, langar (the free community kitchen open to all), gurdwara worship.",
    branches: "Khalsa tradition; several smaller sampradayas."
  },
  {
    id: "bahai", name: "Bahá'í Faith", emoji: "✴️", tagline: "One God, one human family",
    adherents: "~5–8 million", founded: "AD 1863 · Persia (Iran)", founder: "Bahá'u'lláh (1817–1892)",
    scripture: "Kitáb-i-Aqdas and the writings of Bahá'u'lláh",
    god: "One unknowable God, progressively revealed through Messengers — Abraham, Moses, Buddha, Jesus, Muhammad, Bahá'u'lláh.",
    problem: "Humanity's disunity and spiritual immaturity.",
    path: "Recognize God's Messenger for this age; pray, serve, and work for the oneness of humankind.",
    afterlife: "The soul journeys eternally toward God — heaven and hell as nearness and remoteness.",
    practices: "Daily prayer, an annual 19-day fast, service to humanity; no clergy.",
    branches: "Administratively unified worldwide; no major sects."
  },
  {
    id: "jainism", name: "Jainism", emoji: "🤚", tagline: "Nonviolence above all",
    adherents: "~4–5 million", founded: "c. 6th century BC · India (tradition holds it timeless)", founder: "Mahavira, the 24th Tirthankara",
    scripture: "The Agamas",
    god: "No creator God — liberated souls (jinas) are revered as exemplars, not worshiped as deities.",
    problem: "Karma — subtle matter that clings to the soul (jiva) through violence and passion.",
    path: "The Three Jewels — right faith, right knowledge, right conduct — anchored in ahimsa (nonviolence).",
    afterlife: "Rebirth until the soul sheds all karma and rises to liberation (moksha).",
    practices: "Strict vegetarianism, fasting, meditation, monastic asceticism.",
    branches: "Digambara, Śvētāmbara."
  },
  {
    id: "zoroastrianism", name: "Zoroastrianism", emoji: "🔥", tagline: "Good thoughts, words, deeds",
    adherents: "~110,000–125,000", founded: "c. 1200–1000 BC · ancient Persia", founder: "Zarathustra (Zoroaster)",
    scripture: "The Avesta",
    god: "Ahura Mazda, the Wise Lord, opposed by the destructive spirit Angra Mainyu — a cosmic moral dualism.",
    problem: "The struggle between truth (asha) and the lie (druj), fought in every human heart.",
    path: "Choose the good: good thoughts, good words, good deeds.",
    afterlife: "The soul crosses the Chinvat Bridge to reward or torment; a final renovation (Frashokereti) restores all things.",
    practices: "Fire-temple worship, purity rites, seasonal festivals (Nowruz).",
    branches: "Parsis (India), Iranian Zoroastrians."
  },
  {
    id: "taoism", name: "Taoism", emoji: "☯️", tagline: "Flow with the Way",
    adherents: "~12–20 million (far wider cultural reach)", founded: "c. 6th–4th century BC · China", founder: "Laozi (traditional); Zhuangzi",
    scripture: "Tao Te Ching, Zhuangzi",
    god: "The Tao — the nameless source and pattern of all things; religious Taoism adds a rich pantheon.",
    problem: "Striving against the natural way produces disorder and exhaustion.",
    path: "Wu wei — unforced action in harmony with the Tao; simplicity, humility, spontaneity.",
    afterlife: "Varied — immortality cultivation in religious Taoism, ancestral continuation in folk practice.",
    practices: "Meditation, qigong and tai chi, temple ritual, feng shui.",
    branches: "Philosophical (daojia) and religious (daojiao); Quanzhen, Zhengyi."
  },
  {
    id: "confucianism", name: "Confucianism", emoji: "📜", tagline: "Virtue, family, harmony",
    adherents: "~6 million formal; cultural influence over a billion", founded: "551–479 BC · China", founder: "Confucius (Kong Fuzi)",
    scripture: "The Analects; the Five Classics",
    god: "Tian (Heaven) as moral order — more an ethical way of life than a theology.",
    problem: "Social disorder rooted in failed virtue and broken relationships.",
    path: "Cultivate benevolence (ren) and propriety (li); honor the five relationships, beginning with family.",
    afterlife: "Little speculation — honor the ancestors and live rightly now.",
    practices: "Ancestor veneration, ritual propriety, study, self-cultivation.",
    branches: "Classical Confucianism, Neo-Confucianism."
  },
  {
    id: "shinto", name: "Shinto", emoji: "⛩️", tagline: "The way of the kami",
    adherents: "~3–4 million committed; most of Japan participates culturally", founded: "Prehistoric · Japan", founder: "None",
    scripture: "Kojiki and Nihon Shoki (chronicles rather than scripture proper)",
    god: "Countless kami — sacred presences in nature, ancestors, and places.",
    problem: "Impurity (kegare) rather than sin.",
    path: "Purification (harae), sincerity (makoto), and reverence toward the kami.",
    afterlife: "Left vague — the dead may become ancestral kami watching over the living.",
    practices: "Shrine visits, festivals (matsuri), rites of passage, torii gates marking sacred space.",
    branches: "Shrine Shinto, Sect Shinto, folk practice."
  },
  {
    id: "indigenous", name: "Indigenous & Folk Religions", emoji: "🌍", tagline: "The oldest ways",
    adherents: "~300–400 million worldwide", founded: "Prehistoric · every inhabited continent", founder: "None — transmitted orally across generations",
    scripture: "Oral tradition — myth, song, and ceremony",
    god: "Typically a high creator alongside spirits and ancestors who animate the living world.",
    problem: "Broken harmony with the spirit world, the ancestors, or the community.",
    path: "Ritual, ceremony, ancestor veneration, and communal obligation restore balance.",
    afterlife: "The ancestral realm — the dead remain part of the community's life.",
    practices: "Rites of passage, divination, healing ceremonies, seasonal festivals.",
    branches: "Thousands of distinct traditions — Yoruba, Lakota, Shona, Māori, Chinese folk religion, and more."
  },
  {
    id: "lds", name: "Latter-day Saints (Mormonism)", emoji: "📖", tagline: "The Restoration",
    adherents: "~17 million", founded: "AD 1830 · New York, USA", founder: "Joseph Smith (1805–1844)",
    scripture: "Bible, Book of Mormon, Doctrine & Covenants, Pearl of Great Price",
    god: "God the Father, Jesus Christ, and the Holy Ghost as three distinct beings, one in purpose — a view mainstream Christianity disputes.",
    problem: "The Fall and individual sin; mortal life as a probationary test.",
    path: "Faith in Christ, repentance, baptism, temple covenants, and enduring to the end.",
    afterlife: "Three degrees of glory; exaltation for the faithful.",
    practices: "Sacrament meetings, temple worship, missionary service, tithing, the Word of Wisdom.",
    branches: "The LDS Church (largest); Community of Christ."
  },
  {
    id: "atheism", name: "Atheism & Secular Humanism", emoji: "⚛️", tagline: "No god, self-made meaning",
    adherents: "~1.2 billion religiously unaffiliated", founded: "Ancient roots (Epicurus, Cārvāka); modern form from the Enlightenment", founder: "None — a stream of thinkers from Epicurus to the New Atheists",
    scripture: "None — science and reason as the trusted guides",
    god: "None. The natural universe is all there is, was, or will be.",
    problem: "Ignorance, superstition, and poorly organized societies.",
    path: "Reason, science, secular ethics, and human flourishing; meaning is made, not found.",
    afterlife: "None — death is the permanent end of consciousness.",
    practices: "None prescribed — humanist communities, secular ceremonies, civic life.",
    branches: "Atheism, agnosticism, secular humanism, the unaffiliated \"nones\"."
  }
];

const FIELDS = [
  ["adherents", "Adherents"],
  ["founded", "Founded"],
  ["founder", "Founder"],
  ["god", "God / ultimate reality"],
  ["scripture", "Scripture"],
  ["problem", "Human problem"],
  ["path", "The path"],
  ["afterlife", "Afterlife"],
  ["practices", "Practices"],
  ["branches", "Major branches"]
];

// ===== all-religions grid + detail modal =====
const relGrid = document.getElementById('religionGrid');
const relModal = document.getElementById('relModal');
const relModalBody = document.getElementById('modalBody');

RELIGIONS.forEach(r => {
  const card = document.createElement('div');
  card.className = 'rcard';
  card.innerHTML = `<span class="emoji">${r.emoji}</span><h3>${r.name}</h3>` +
    `<div class="tagline">${r.tagline}</div><p>${r.god}</p>` +
    `<span class="meta">${r.adherents} · ${r.founded.split('·')[0].trim()}</span>`;
  card.addEventListener('click', () => openRelModal(r));
  relGrid.appendChild(card);
});

function openRelModal(r) {
  relModalBody.innerHTML = `<span class="m-emoji">${r.emoji}</span><h3>${r.name}</h3>` +
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

// ===== comparison lab (pick 3–5, see them side by side) =====
const MIN_PICK = 3, MAX_PICK = 5;
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
      flashHint(`Up to ${MAX_PICK} at a time — deselect one first.`);
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
    ? `Pick ${MIN_PICK - picked.size} more — the lab compares at least ${MIN_PICK} traditions at once.`
    : `Comparing ${picked.size} traditions. Tap chips to swap (${MIN_PICK}–${MAX_PICK}).`;
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

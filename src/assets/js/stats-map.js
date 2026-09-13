(async () => {
  const $ = id => document.getElementById(id);
  const norm = s => s.toLowerCase().replace(/[’'.]/g, '').replace(/&/g, 'and').trim();

  // world-atlas name → common analytics name (both normalized)
  const ALIASES = {
    'united states of america': 'united states',
    'dem rep congo': 'congo (kinshasa)', 'congo': 'congo (brazzaville)',
    'central african rep': 'central african republic',
    'dominican rep': 'dominican republic',
    's sudan': 'south sudan', 'w sahara': 'western sahara',
    'eq guinea': 'equatorial guinea', 'solomon is': 'solomon islands',
    'falkland is': 'falkland islands', 'timor-leste': 'east timor',
    'bosnia and herz': 'bosnia and herzegovina', 'macedonia': 'north macedonia',
    'czechia': 'czech republic', 'eswatini': 'swaziland',
    'united kingdom': 'united kingdom of great britain and northern ireland',
    'russia': 'russian federation', 'south korea': 'korea, republic of',
    'north korea': 'korea, democratic people’s republic of',
    'iran': 'iran, islamic republic of', 'syria': 'syrian arab republic',
    'vietnam': 'viet nam', 'laos': 'lao people’s democratic republic',
    'bolivia': 'bolivia, plurinational state of',
    'venezuela': 'venezuela, bolivarian republic of',
    'tanzania': 'tanzania, united republic of',
    'moldova': 'moldova, republic of', 'brunei': 'brunei darussalam',
    'taiwan': 'taiwan, province of china', 'cote divoire': 'côte d’ivoire'
  };

  let data = { updated: null, total: 0, countries: [] };
  try {
    const res = await fetch('/data/countries.json', { cache: 'no-store' });
    if (res.ok) data = await res.json();
  } catch (e) { /* keep empty state */ }

  // lookup: several normalized keys per country → count
  const counts = new Map();
  for (const c of (data.countries || [])) {
    const keys = new Set([norm(c.name || ''), (c.code || '').toLowerCase()]);
    for (const k of keys) if (k) counts.set(k, c);
  }
  const findFor = feature => {
    const n = norm(feature.properties.name);
    return counts.get(n) || counts.get(ALIASES[n]) ||
           counts.get(Object.keys(ALIASES).find(k => ALIASES[k] === n) || '') || null;
  };

  // stat tiles
  $('statTotal').textContent = (data.total || 0).toLocaleString();
  $('statCountries').textContent = (data.countries || []).length;
  $('statUpdated').textContent = data.updated ? new Date(data.updated).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'awaiting first data';

  const empty = !(data.countries || []).length;
  $('emptyNote').hidden = !empty;
  $('legendRow').hidden = empty;
  $('emptyTable').hidden = !empty;

  // sequential ramp: one hue (site indigo), dark → bright on the dark surface
  const maxCount = Math.max(1, ...(data.countries || []).map(c => c.count));
  const ramp = t => d3.interpolateRgb('#252c55', '#aebcff')(t);
  const scale = d3.scaleSqrt().domain([1, maxCount]).range([0.15, 1]);
  const fillFor = c => c ? ramp(scale(c.count)) : '#151a2d';

  // legend
  $('legendGrad').style.background = `linear-gradient(90deg, ${ramp(0.15)}, ${ramp(1)})`;
  $('legendMax').textContent = `${maxCount.toLocaleString()} visits`;

  // ranks table
  const tbody = document.querySelector('#rankTable tbody');
  (data.countries || []).forEach((c, i) => {
    const tr = document.createElement('tr');
    const share = data.total ? (c.count / data.total * 100) : 0;
    tr.innerHTML = `<td>${i + 1}</td><td>${c.name}</td><td class="num">${c.count.toLocaleString()}</td>` +
      `<td><div class="share-bar" style="width:${Math.max(2, share)}%" title="${share.toFixed(1)}%"></div></td>`;
    tbody.appendChild(tr);
  });

  // world map
  const world = await fetch('/vendor/countries-110m.json').then(r => r.json());
  const countries = topojson.feature(world, world.objects.countries).features;
  const projection = d3.geoNaturalEarth1().fitSize([960, 500], { type: 'Sphere' });
  const path = d3.geoPath(projection);
  const svg = d3.select('#worldMap');
  const tip = $('mapTip');

  svg.append('path').attr('d', path({ type: 'Sphere' }))
    .attr('fill', 'none').attr('stroke', 'rgba(255,255,255,.08)');

  svg.selectAll('path.country').data(countries).join('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', d => fillFor(findFor(d)))
    .on('mousemove', (event, d) => {
      const c = findFor(d);
      tip.style.display = 'block';
      tip.style.left = (event.clientX + 14) + 'px';
      tip.style.top = (event.clientY + 14) + 'px';
      tip.innerHTML = `<strong>${d.properties.name}</strong><br><span class="tt-count">${c ? c.count.toLocaleString() + ' visit' + (c.count === 1 ? '' : 's') : 'No visits yet'}</span>`;
    })
    .on('mouseleave', () => { tip.style.display = 'none'; });

  // reveal-on-scroll (match site behavior)
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

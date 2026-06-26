const KMB_BASE = "https://data.etabus.gov.hk/v1/transport/kmb";
const GMB_BASE = "https://data.etagmb.gov.hk";
const LEAVE_COUNTDOWN_MINUTES = 3;
const NEARBY_ROUTE_WINDOW_MINUTES = 10;
const NELSON_TO_WING_SING_ROUTES = [
  { route: "1", bound: "O", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 17, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "1A", bound: "O", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 26, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "2", bound: "I", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 11, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "6", bound: "I", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 13, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "70S", bound: "I", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 13, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87C", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 14, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "3", stopId: "14F176D358D65A8B", stopSeq: 13, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "4", stopId: "14F176D358D65A8B", stopSeq: 18, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 19, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87E", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 11, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "281A", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 13, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "N216", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 35, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "N241", bound: "I", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 42, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
];

const ROUTES = [
  {
    id: "gmb-kln-74",
    label: "小巴74",
    operator: "GMB",
    region: "KLN",
    route: "74",
    trips: [
      {
        id: "gmb-kln-74-home",
        label: "油麻地返屋企🥬🐮",
        routeSeq: 1,
        stopSeq: 8,
        stopLabelEn: "Reclamation Street near Wing Sing Lane",
        reminderAtMinutes: 8,
        reminderAction: "落樓",
      },
    ],
  },
  {
    id: "kmb-72x",
    label: "KMB 72X",
    operator: "KMB",
    route: "72X",
    serviceType: "1",
    trips: [
      {
        id: "kmb-72x-to-home",
        label: "大埔返屋企🥬🐮",
        direction: "outbound",
        bound: "O",
        stopSeq: 7,
        reminderAtMinutes: 8,
        reminderAction: "落樓",
      },
      {
        id: "kmb-72x-to-taipo",
        label: "屋企🥬🐮返大埔",
        direction: "inbound",
        bound: "I",
        stopSeq: 7,
        reminderAtMinutes: 9,
        reminderAction: "出門",
      },
    ],
  },
  {
    id: "kmb-271",
    label: "KMB 271",
    operator: "KMB",
    route: "271",
    serviceType: "1",
    trips: [
      {
        id: "kmb-271-to-home",
        label: "大埔返屋企🥬🐮",
        direction: "outbound",
        bound: "O",
        stopSeq: 7,
        reminderAtMinutes: 8,
        reminderAction: "落樓",
      },
      {
        id: "kmb-271-yau-ma-tei-to-taipo",
        label: "油麻地返大埔",
        direction: "inbound",
        bound: "I",
        stopSeq: 10,
        reminderAtMinutes: 8,
        reminderAction: "落樓",
      },
      {
        id: "kmb-271-home-to-taipo",
        label: "屋企🥬🐮返大埔",
        direction: "inbound",
        bound: "I",
        stopSeq: 13,
        reminderAtMinutes: 9,
        reminderAction: "出門",
      },
    ],
  },
  {
    id: "kmb-nelson-wing-sing",
    label: "KMB",
    operator: "KMB_MULTI",
    trips: [
      {
        id: "kmb-nelson-wing-sing-to-yau-ma-tei",
        label: "屋企🥬🐮返油麻地",
        reminderAtMinutes: 8,
        reminderAction: "出門",
      },
    ],
  },
];

const PRESET_GROUPS = [
  {
    title: "返工🥺",
    presets: [
      ["kmb-271", "kmb-271-home-to-taipo"],
      ["kmb-72x", "kmb-72x-to-taipo"],
      ["kmb-nelson-wing-sing", "kmb-nelson-wing-sing-to-yau-ma-tei"],
      ["kmb-271", "kmb-271-yau-ma-tei-to-taipo"],
    ],
  },
  {
    title: "返屋企食菜🥬",
    presets: [
      ["kmb-271", "kmb-271-to-home"],
      ["kmb-72x", "kmb-72x-to-home"],
      ["gmb-kln-74", "gmb-kln-74-home"],
    ],
  },
];

const els = {
  presetButtons: document.querySelector("#presetButtons"),
  refreshButton: document.querySelector("#refreshButton"),
  routeName: document.querySelector("#routeName"),
  stopName: document.querySelector("#stopName"),
  reminderPanel: document.querySelector("#reminderPanel"),
  lastUpdated: document.querySelector("#lastUpdated"),
  clock: document.querySelector("#clock"),
  etaList: document.querySelector("#etaList"),
};

const cache = new Map();
const state = {
  routeId: PRESET_GROUPS[0].presets[0][0],
  tripId: PRESET_GROUPS[0].presets[0][1],
  stop: null,
  gmbRouteId: null,
  loadToken: 0,
  selectedArrivalId: null,
  arrivals: [],
};

init();

function init() {
  renderPresetButtons();
  wireEvents();
  updateClock();
  setInterval(tick, 1000);
  setInterval(() => refreshEta({ quiet: true }), 30000);
  loadPreset();
}

function tick() {
  updateClock();
  renderReminder(selectedArrival());
}

function wireEvents() {
  els.refreshButton.addEventListener("click", () => refreshEta());

  els.presetButtons.addEventListener("click", (event) => {
    const button = event.target.closest(".preset-button");
    if (!button) return;
    state.routeId = button.dataset.routeId;
    state.tripId = button.dataset.tripId;
    state.stop = null;
    state.selectedArrivalId = null;
    renderPresetButtons();
    loadPreset();
  });

  els.etaList.addEventListener("click", (event) => {
    const card = event.target.closest(".eta-card");
    if (!card) return;
    state.selectedArrivalId = card.dataset.arrivalId;
    renderEta(state.arrivals);
  });

  els.etaList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".eta-card");
    if (!card) return;
    event.preventDefault();
    state.selectedArrivalId = card.dataset.arrivalId;
    renderEta(state.arrivals);
  });
}

function renderPresetButtons() {
  els.presetButtons.innerHTML = PRESET_GROUPS.map((group) => `
    <section class="preset-group">
      <h2>${escapeHtml(group.title)}</h2>
      <div class="preset-list">
        ${group.presets.map(([routeId, tripId]) => {
      const route = getRouteById(routeId);
      const trip = getTripById(route, tripId);
      const selected = route.id === state.routeId && trip.id === state.tripId;
      return `
        <button
          class="preset-button"
          type="button"
          data-route-id="${route.id}"
          data-trip-id="${trip.id}"
          aria-pressed="${selected}"
        >
          <span class="preset-route">${escapeHtml(route.label)}</span>
          <span class="preset-trip">${escapeHtml(trip.label)}</span>
        </button>
      `;
    }).join("")}
      </div>
    </section>
  `).join("");
}

async function loadPreset() {
  const token = ++state.loadToken;
  setLoading("Loading preset...");

  try {
    const stop = await getSelectedStop();
    if (token !== state.loadToken) return;
    state.stop = stop;
    renderRouteName();
    await refreshEta({ token });
  } catch (error) {
    if (token !== state.loadToken) return;
    renderError(error);
  }
}

async function refreshEta({ quiet = false, token = state.loadToken } = {}) {
  if (!state.stop) return;

  if (!quiet) {
    els.refreshButton.disabled = true;
    els.lastUpdated.textContent = "Refreshing live arrivals";
  }

  try {
    const route = currentRoute();
    const trip = currentTrip();
    const arrivals = route.operator === "KMB_MULTI"
      ? await getNearbyKmbEta()
      : route.operator === "KMB"
        ? await getKmbEta(route, trip, state.stop)
        : await getGmbEta(trip, state.stop);
    if (token !== state.loadToken) return;
    state.arrivals = arrivals;
    if (!arrivals.some((arrival) => arrival.id === state.selectedArrivalId)) {
      state.selectedArrivalId = null;
    }
    renderRouteName();
    renderEta(arrivals);
    els.lastUpdated.textContent = `Updated ${formatTime(new Date())}`;
  } catch (error) {
    if (token !== state.loadToken) return;
    renderError(error);
  } finally {
    if (token === state.loadToken) {
      els.refreshButton.disabled = false;
    }
  }
}

async function getSelectedStop() {
  const route = currentRoute();
  const trip = currentTrip();
  if (route.operator === "KMB_MULTI") {
    return {
      seq: "",
      nameEn: "Nelson Street MK514/MK515 → Wing Sing Lane YT544/YT542",
      nameTc: "奶路臣街 → 永星里",
    };
  }
  return route.operator === "KMB" ? getKmbStop(route, trip) : getGmbStop(route, trip);
}

async function getKmbStop(route, trip) {
  const routeStops = await fetchCached(`${KMB_BASE}/route-stop/${route.route}/${trip.direction}/${route.serviceType}`);
  const routeStop = routeStops.data.find((item) => Number(item.seq) === trip.stopSeq);

  if (!routeStop) {
    throw new Error(`Stop ${trip.stopSeq} not found for ${route.label}.`);
  }

  const stop = await fetchCached(`${KMB_BASE}/stop/${routeStop.stop}`);
  return {
    stopId: routeStop.stop,
    seq: Number(routeStop.seq),
    nameEn: stop.data.name_en,
    nameTc: stop.data.name_tc,
  };
}

async function getGmbStop(route, trip) {
  const routeId = await getGmbRouteId(route);
  const routeStops = await fetchCached(`${GMB_BASE}/route-stop/${routeId}/${trip.routeSeq}`);
  const stop = routeStops.data.route_stops.find((item) => Number(item.stop_seq) === trip.stopSeq);

  if (!stop) {
    throw new Error(`Stop ${trip.stopSeq} not found for ${route.label}.`);
  }

  return {
    stopId: stop.stop_id,
    seq: stop.stop_seq,
    nameEn: trip.stopLabelEn || stop.name_en,
    nameTc: stop.name_tc,
  };
}

async function getGmbRouteId(route) {
  if (state.gmbRouteId) return state.gmbRouteId;
  const json = await fetchCached(`${GMB_BASE}/route/${route.region}/${route.route}`);
  state.gmbRouteId = json.data[0].route_id;
  return state.gmbRouteId;
}

async function getKmbEta(route, trip, stop) {
  const json = await fetchJson(`${KMB_BASE}/eta/${stop.stopId}/${route.route}/${route.serviceType}`);
  return json.data
    .filter((item) => item.dir === trip.bound && Number(item.seq) === stop.seq)
    .slice(0, 3)
    .map((item) => ({
      id: `${route.route}-${trip.bound}-${route.serviceType}-${item.eta_seq}`,
      seq: item.eta_seq,
      time: item.eta ? new Date(item.eta) : null,
      minutes: item.eta ? minutesUntil(item.eta) : null,
      remark: item.rmk_en || item.rmk_tc || "",
    }));
}

async function getNearbyKmbEta() {
  const arrivals = await Promise.all(NELSON_TO_WING_SING_ROUTES.map(async (candidate) => {
    const json = await fetchJson(`${KMB_BASE}/eta/${candidate.stopId}/${candidate.route}/${candidate.serviceType}`);
    return json.data
      .filter((item) => item.dir === candidate.bound && Number(item.seq) === candidate.stopSeq)
      .map((item) => {
        const minutes = item.eta ? minutesUntil(item.eta) : null;
        return {
          id: `${candidate.route}-${candidate.bound}-${candidate.serviceType}-${item.eta_seq}-${item.eta || "none"}`,
          seq: item.eta_seq,
          routeLabel: `Route ${candidate.route}`,
          routeNumber: candidate.route,
          time: item.eta ? new Date(item.eta) : null,
          minutes,
          remark: `${candidate.stopLabel} → ${candidate.destLabel}`,
        };
      })
      .filter((arrival) => arrival.minutes != null && arrival.minutes <= NEARBY_ROUTE_WINDOW_MINUTES);
  }));

  const seen = new Set();
  return arrivals
    .flat()
    .filter((arrival) => {
      const key = `${arrival.routeNumber}-${arrival.time?.toISOString() || "none"}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.minutes - b.minutes || a.routeLabel.localeCompare(b.routeLabel, undefined, { numeric: true }))
    .slice(0, 12);
}

async function getGmbEta(trip, stop) {
  const routeId = await getGmbRouteId(currentRoute());
  const json = await fetchJson(`${GMB_BASE}/eta/route-stop/${routeId}/${trip.routeSeq}/${stop.seq}`);
  return (json.data.eta || []).slice(0, 3).map((item) => ({
    id: `gmb-${trip.routeSeq}-${item.eta_seq}`,
    seq: item.eta_seq,
    time: item.timestamp ? new Date(item.timestamp) : null,
    minutes: Number.isFinite(item.diff) ? item.diff : minutesUntil(item.timestamp),
    remark: item.remarks_en || item.remarks_tc || "",
  }));
}

function renderRouteName() {
  const route = currentRoute();
  const trip = currentTrip();
  els.routeName.textContent = `${route.label}: ${trip.label}`;
  els.stopName.textContent = state.stop
    ? route.operator === "KMB_MULTI"
      ? `${state.stop.nameEn} / ${state.stop.nameTc}`
      : `Stop ${state.stop.seq}: ${state.stop.nameEn} / ${state.stop.nameTc}`
    : "";
}

function renderEta(arrivals) {
  if (!arrivals.length) {
    const emptyText = currentRoute().operator === "KMB_MULTI"
      ? `No matching route arrivals within ${NEARBY_ROUTE_WINDOW_MINUTES} minutes right now.`
      : "No arrival data for this stop right now.";
    els.etaList.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    renderReminder(null);
    return;
  }

  els.etaList.innerHTML = arrivals.map((arrival) => {
    const selected = arrival.id === state.selectedArrivalId;
    const minutesText = arrival.minutes == null ? "--" : arrival.minutes <= 0 ? "Due" : arrival.minutes;
    const unit = typeof minutesText === "number" ? "min" : "";
    return `
      <article class="eta-card" data-arrival-id="${escapeHtml(arrival.id)}" aria-selected="${selected}" tabindex="0">
        <div class="seq"><span>${escapeHtml(arrival.routeLabel || `Arrival ${arrival.seq}`)}</span><span>${selected ? "Selected" : unit}</span></div>
        <p class="minutes">${minutesText}</p>
        <p class="time">${arrival.time ? formatTime(arrival.time) : "Time unavailable"}</p>
        <p class="remark">${escapeHtml(arrival.remark)}</p>
      </article>
    `;
  }).join("");

  renderReminder(selectedArrival());
}

function renderReminder(arrival) {
  const trip = currentTrip();
  if (!arrival) {
    els.reminderPanel.innerHTML = `
      <p class="reminder-title">未揀車</p>
      <p class="reminder-copy">Click an arrival to target that bus.</p>
    `;
    els.reminderPanel.dataset.status = "idle";
    return;
  }

  if (arrival.minutes == null) {
    els.reminderPanel.innerHTML = `
      <p class="reminder-title">Selected ${escapeHtml(arrival.routeLabel || `arrival ${arrival.seq}`)}</p>
      <p class="reminder-copy">Arrival time unavailable.</p>
    `;
    els.reminderPanel.dataset.status = "idle";
    return;
  }

  const leaveLeadMinutes = Math.max(0, trip.reminderAtMinutes - LEAVE_COUNTDOWN_MINUTES);
  const leaveTime = new Date(arrival.time.getTime() - leaveLeadMinutes * 60000);
  const millisecondsToLeave = leaveTime.getTime() - Date.now();
  const minutesToLeave = Math.max(0, Math.ceil(millisecondsToLeave / 60000));
  const isPastLeaveTime = millisecondsToLeave <= 0;
  const emoji = minutesToLeave <= 1 ? "🏃🏻‍♀️" : "❤️";
  const reminderTitle = isPastLeaveTime
    ? "條街好熱 辛苦牛牛耐心等等"
    : `${minutesToLeave}分鐘後要${trip.reminderAction}${emoji}`;

  els.reminderPanel.innerHTML = `
    <p class="reminder-title">${escapeHtml(reminderTitle)}</p>
    <p class="reminder-copy">${trip.reminderAction}時間 ${formatTime(leaveTime)} · Selected ${escapeHtml(arrival.routeLabel || `arrival ${arrival.seq}`)} at ${arrival.time ? formatTime(arrival.time) : "--"} · ${arrival.minutes} min</p>
  `;
  els.reminderPanel.dataset.status = minutesToLeave <= LEAVE_COUNTDOWN_MINUTES ? "active" : "waiting";
}

function renderError(error) {
  els.etaList.innerHTML = `<div class="error-state">${escapeHtml(error.message || "Unable to load live data.")}</div>`;
  renderReminder(null);
  els.lastUpdated.textContent = "Live data unavailable";
  els.refreshButton.disabled = false;
}

function setLoading(message) {
  els.routeName.textContent = message;
  els.stopName.textContent = "";
  renderReminder(null);
  els.lastUpdated.textContent = "Please wait";
  els.etaList.innerHTML = `<div class="empty-state">${message}</div>`;
}

function currentRoute() {
  return getRouteById(state.routeId) || ROUTES[0];
}

function currentTrip() {
  const route = currentRoute();
  return getTripById(route, state.tripId) || route.trips[0];
}

function getRouteById(routeId) {
  return ROUTES.find((route) => route.id === routeId);
}

function getTripById(route, tripId) {
  return route?.trips.find((trip) => trip.id === tripId);
}

function selectedArrival() {
  return state.arrivals.find((arrival) => arrival.id === state.selectedArrivalId);
}

async function fetchCached(url) {
  if (!cache.has(url)) {
    cache.set(url, fetchJson(url));
  }
  return cache.get(url);
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }
  return response.json();
}

function minutesUntil(value) {
  const diff = new Date(value).getTime() - Date.now();
  return Math.max(0, Math.round(diff / 60000));
}

function formatTime(date) {
  return new Intl.DateTimeFormat("en-HK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function updateClock() {
  els.clock.textContent = formatTime(new Date());
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

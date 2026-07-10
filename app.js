const KMB_BASE = "https://data.etabus.gov.hk/v1/transport/kmb";
const GMB_BASE = "https://data.etagmb.gov.hk";
const CITYBUS_BASE = "https://rt.data.gov.hk/v2/transport/citybus";
const TRAFFIC_NEWS_URL = "https://resource.data.one.gov.hk/td/tc/specialtrafficnews.xml";
const TRAFFIC_CACHE_KEY = "cowBusTrafficNewsCacheV1";
const TRAFFIC_CACHE_MS = 3 * 60 * 1000;
const macphersonToYauMaTei = {
  pickup: {
    addressLine1: "麥花臣匯門口",
    addressLine2: "旺角奶路臣街38號",
    id: "ChIJU67ZEcYABDQR8O6ZIei9upg",
    source: "SEARCH",
    latitude: 22.318649,
    longitude: 114.17286960000001,
    provider: "google_places",
  },
  dropoff: {
    addressLine1: "森基商業大廈",
    addressLine2: "油麻地彌敦道478號",
    id: "ChIJ4briqMEABDQRKSryoTJwMZE",
    source: "SEARCH",
    latitude: 22.3112983,
    longitude: 114.17129759999999,
    provider: "google_places",
  },
  vehicle: "20017011",
};
const LEAVE_COUNTDOWN_MINUTES = 3;
const NEARBY_ROUTE_WINDOW_MINUTES = 10;
const UBER_JOURNEYS = {
  macphersonToYauMaTei,
};
const UBER_APP_FALLBACK_DELAY_MS = 1200;
const TRAFFIC_ROUTE_KEYWORDS = {
  "271": ["獅子山隧道", "吐露港公路", "大埔公路", "沙田", "大圍", "九龍塘"],
  "72X": ["獅子山隧道", "吐露港公路", "大埔公路", "沙田", "大圍", "窩打老道", "旺角"],
};
const TRAFFIC_SEGMENT_LABELS = {
  "獅子山隧道": "獅子山隧道",
  "吐露港公路": "吐露港公路",
  "大埔公路": "大埔公路 / 沙田段",
  "沙田": "沙田一帶",
  "大圍": "大圍一帶",
  "九龍塘": "九龍塘一帶",
  "窩打老道": "窩打老道",
  "旺角": "旺角一帶",
};
const TRAFFIC_DIRECTION_KEYWORDS = {
  kowloonBound: ["往九龍", "往九龍方向", "向九龍", "九龍方向", "往旺角", "往佐敦", "往油麻地", "往尖沙咀", "往西九龍"],
  ntBound: ["往新界", "往沙田", "往大埔", "往上水", "往粉嶺", "往馬場", "沙田方向", "大埔方向", "新界方向"],
};
const ROUTE_BOUND_CONFIG = {
  "271": {
    kowloonBound: { label: "往九龍方向", relevantTrafficDirection: "kowloonBound" },
    ntBound: { label: "往大埔方向", relevantTrafficDirection: "ntBound" },
  },
  "72X": {
    kowloonBound: { label: "往九龍方向", relevantTrafficDirection: "kowloonBound" },
    ntBound: { label: "往大埔方向", relevantTrafficDirection: "ntBound" },
  },
};
const NELSON_TO_WING_SING_ROUTES = [
  { route: "1", bound: "O", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 17, destSeq: 19, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "1A", bound: "O", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 26, destSeq: 28, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "2", bound: "I", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 11, destSeq: 14, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "6", bound: "I", serviceType: "1", stopId: "6AB438AD3AE100DD", stopSeq: 13, destSeq: 16, stopLabel: "NELSON STREET MK515", destLabel: "WING SING LANE YT542" },
  { route: "70S", bound: "I", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 13, destSeq: 15, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87C", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 14, destSeq: 16, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "3", stopId: "14F176D358D65A8B", stopSeq: 13, destSeq: 15, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "4", stopId: "14F176D358D65A8B", stopSeq: 18, destSeq: 20, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87D", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 19, destSeq: 21, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "87E", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 11, destSeq: 13, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "281A", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 13, destSeq: 15, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "N216", bound: "O", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 35, destSeq: 38, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
  { route: "N241", bound: "I", serviceType: "1", stopId: "14F176D358D65A8B", stopSeq: 42, destSeq: 45, stopLabel: "NELSON STREET MK514", destLabel: "WING SING LANE YT544" },
];
const CITYBUS_TO_YAU_MA_TEI_ROUTES = [
  {
    route: "20A",
    bound: "O",
    stopId: "001559",
    stopSeq: 27,
    stopLabel: "CITYBUS STOP 27 BANK CENTRE",
    destLabel: "WEST KOWLOON STATION",
  },
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
    label: "巴士",
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
  dayCounter: document.querySelector("#dayCounter"),
  presetButtons: document.querySelector("#presetButtons"),
  refreshButton: document.querySelector("#refreshButton"),
  routeName: document.querySelector("#routeName"),
  stopName: document.querySelector("#stopName"),
  trafficWarning: document.querySelector("#trafficWarning"),
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
  trafficLoadToken: 0,
  selectedArrivalId: null,
  arrivals: [],
  shouldScrollToEta: false,
};

init();

function init() {
  renderPresetButtons();
  wireEvents();
  updateClock();
  updateDayCounter();
  setInterval(tick, 1000);
  setInterval(() => refreshEta({ quiet: true }), 30000);
  loadPreset();
}

function tick() {
  updateClock();
  updateDayCounter();
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
    state.shouldScrollToEta = true;
    renderPresetButtons();
    loadPreset();
  });

  const uberLinks = document.querySelectorAll(".uber-link");
  uberLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const journeyKey = link.dataset.uberJourney;
      if (!journeyKey) return;
      event.preventDefault();
      const journey = UBER_JOURNEYS[journeyKey];
      if (!journey) return;
      openUberJourney(journey);
    });
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

function buildUberDeeplink({ pickup, dropoff, vehicle }) {
  const params = new URLSearchParams();
  params.set("pickup", JSON.stringify(pickup));
  params.set("drop[0]", JSON.stringify(dropoff));
  params.set("vehicle", vehicle);
  return `https://m.uber.com/go/product-selection?${params.toString()}`;
}

function buildUberUniversalLink({ pickup, dropoff, vehicle }) {
  const params = new URLSearchParams();
  params.set("action", "setPickup");
  params.set("pickup", JSON.stringify(pickup));
  params.set("drop[0]", JSON.stringify(dropoff));
  params.set("vehicle", vehicle);
  return `https://m.uber.com/ul/?${params.toString()}`;
}

function openUberJourney(journey) {
  const appUrl = buildUberUniversalLink(journey);
  const webUrl = buildUberDeeplink(journey);

  window.location.assign(appUrl);

  window.setTimeout(() => {
    if (document.visibilityState === "visible") {
      window.location.assign(webUrl);
    }
  }, UBER_APP_FALLBACK_DELAY_MS);
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
    updateTrafficWarningsInBackground();
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
    scrollToEtaAfterRouteChoice();
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

async function updateTrafficWarningsInBackground() {
  const context = currentTrafficRouteContext();
  const token = ++state.trafficLoadToken;

  if (!context) {
    renderTrafficWarning(null);
    return;
  }

  renderTrafficWarningLoadingState();

  try {
    const trafficNewsItems = await getCachedOrFetchTrafficNews();
    if (token !== state.trafficLoadToken) return;
    const warning = getTrafficWarningForRoute(context.routeNo, context.boundKey, trafficNewsItems);
    renderTrafficWarning(warning);
  } catch (error) {
    if (token !== state.trafficLoadToken) return;
    console.warn("Traffic warning unavailable", error);
    renderTrafficWarningUnavailable();
  }
}

async function getCachedOrFetchTrafficNews() {
  const cached = readTrafficCache();
  if (cached && Date.now() - cached.timestamp < TRAFFIC_CACHE_MS) {
    return cached.items;
  }

  const items = await fetchTrafficNews();
  writeTrafficCache(items);
  return items;
}

async function fetchTrafficNews() {
  const response = await fetch(TRAFFIC_NEWS_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Traffic news request failed (${response.status})`);
  }

  const xmlText = await response.text();
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  const messages = Array.from(xml.getElementsByTagNameNS("*", "message"));

  return messages.map((message) => {
    const title = getXmlText(message, "ChinShort");
    const content = getXmlText(message, "ChinText");
    return {
      id: getXmlText(message, "msgID"),
      status: getXmlText(message, "CurrentStatus"),
      title,
      content,
      time: getXmlText(message, "ReferenceDate"),
    };
  }).filter((item) => item.status !== "3" && (item.title || item.content));
}

function getTrafficWarningForRoute(routeNo, boundKey, trafficNewsItems) {
  const keywords = TRAFFIC_ROUTE_KEYWORDS[routeNo] || [];
  const boundConfig = ROUTE_BOUND_CONFIG[routeNo]?.[boundKey];
  if (!keywords.length || !boundConfig) return null;

  const affectedSegments = new Set();
  const summaries = [];
  let hasHighConfidence = false;

  trafficNewsItems.forEach((item) => {
    const text = `${item.title} ${item.content}`.replace(/\s+/g, " ").trim();
    const matchedKeywords = keywords.filter((keyword) => text.includes(keyword));
    if (!matchedKeywords.length) return;

    const detectedDirections = detectTrafficDirections(text);
    const hasMatchingDirection = detectedDirections.includes(boundConfig.relevantTrafficDirection);
    const hasOppositeDirection = detectedDirections.some((direction) => direction !== boundConfig.relevantTrafficDirection);
    if (hasOppositeDirection && !hasMatchingDirection) return;

    matchedKeywords.forEach((keyword) => affectedSegments.add(TRAFFIC_SEGMENT_LABELS[keyword] || keyword));
    if (hasMatchingDirection) {
      hasHighConfidence = true;
    }

    if (summaries.length < 2) {
      summaries.push(compactTrafficText(item.title || item.content));
    }
  });

  if (!affectedSegments.size) return null;

  return {
    level: hasHighConfidence ? "high" : "medium",
    segments: Array.from(affectedSegments),
    directionLabel: hasHighConfidence ? boundConfig.label : "交通消息未有清楚指出",
    summaries,
  };
}

function renderTrafficWarning(warning) {
  if (!warning) {
    els.trafficWarning.className = "traffic-warning traffic-warning--normal";
    els.trafficWarning.innerHTML = "🟢 暫未見相關方向的交通事故或嚴重擠塞";
    return;
  }

  const isHigh = warning.level === "high";
  els.trafficWarning.className = `traffic-warning traffic-warning--${warning.level}`;
  els.trafficWarning.innerHTML = `
    <p class="traffic-warning-title">${isHigh ? "⚠️" : "🟡"} 車程風險提示</p>
    <p>可能受影響路段：${escapeHtml(warning.segments.join("、"))}</p>
    <p>方向：${escapeHtml(warning.directionLabel)}</p>
    <p>${isHigh ? "相關路段有交通消息，建議預多 10–20 分鐘。" : "相關路段有交通消息，建議留意實際車程。"}</p>
    ${warning.summaries.length ? `<p class="traffic-warning-news">交通消息：${escapeHtml(warning.summaries.join(" / "))}</p>` : ""}
  `;
}

function renderTrafficWarningLoadingState() {
  els.trafficWarning.className = "traffic-warning traffic-warning--loading";
  els.trafficWarning.textContent = "車程風險提示：檢查中...";
}

function renderTrafficWarningUnavailable() {
  els.trafficWarning.className = "traffic-warning traffic-warning--unavailable";
  els.trafficWarning.textContent = "車程風險提示暫時未能更新";
}

function currentTrafficRouteContext() {
  const route = currentRoute();
  const trip = currentTrip();
  if (!ROUTE_BOUND_CONFIG[route.route]) return null;

  return {
    routeNo: route.route,
    boundKey: trip.bound === "O" ? "kowloonBound" : "ntBound",
  };
}

function detectTrafficDirections(text) {
  return Object.entries(TRAFFIC_DIRECTION_KEYWORDS)
    .filter(([, keywords]) => keywords.some((keyword) => text.includes(keyword)))
    .map(([direction]) => direction);
}

function compactTrafficText(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > 88 ? `${text.slice(0, 88)}...` : text;
}

function getXmlText(parent, tagName) {
  return parent.getElementsByTagNameNS("*", tagName)[0]?.textContent.trim() || "";
}

function readTrafficCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(TRAFFIC_CACHE_KEY));
    return cached && Number.isFinite(cached.timestamp) && Array.isArray(cached.items) ? cached : null;
  } catch {
    return null;
  }
}

function writeTrafficCache(items) {
  try {
    localStorage.setItem(TRAFFIC_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), items }));
  } catch {
    // Cache is helpful, not required.
  }
}

async function getSelectedStop() {
  const route = currentRoute();
  const trip = currentTrip();
  if (route.operator === "KMB_MULTI") {
    return {
      seq: "",
      nameEn: "Nelson Street MK514/MK515 → Wing Sing Lane YT544/YT542 + Citybus 20A Bank Centre → Wing Sing Lane",
      nameTc: "",
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
  const kmbArrivals = await Promise.all(NELSON_TO_WING_SING_ROUTES.map(async (candidate) => {
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
          isFast: candidate.destSeq - candidate.stopSeq === 2,
          time: item.eta ? new Date(item.eta) : null,
          minutes,
          remark: `${candidate.stopLabel} → ${candidate.destLabel}`,
        };
      })
      .filter((arrival) => arrival.minutes != null && arrival.minutes <= NEARBY_ROUTE_WINDOW_MINUTES);
  }));

  const citybusArrivals = await Promise.all(CITYBUS_TO_YAU_MA_TEI_ROUTES.map(async (candidate) => {
    const json = await fetchJson(`${CITYBUS_BASE}/eta/CTB/${candidate.stopId}/${candidate.route}`);
    return json.data
      .filter((item) => item.dir === candidate.bound && item.stop === candidate.stopId)
      .map((item) => {
        const minutes = item.eta ? minutesUntil(item.eta) : null;
        return {
          id: `ctb-${candidate.route}-${candidate.bound}-${item.eta_seq}-${item.eta || "none"}`,
          seq: item.eta_seq,
          routeLabel: `Citybus ${candidate.route}`,
          routeNumber: `CTB ${candidate.route}`,
          time: item.eta ? new Date(item.eta) : null,
          minutes,
          remark: `${candidate.stopLabel} → ${candidate.destLabel}`,
        };
      })
      .filter((arrival) => arrival.minutes != null && arrival.minutes <= NEARBY_ROUTE_WINDOW_MINUTES);
  }));

  const seen = new Set();
  return [...kmbArrivals, ...citybusArrivals]
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
      ? state.stop.nameTc ? `${state.stop.nameEn} / ${state.stop.nameTc}` : state.stop.nameEn
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
    const unit = typeof minutesText === "number" ? " min" : "";
    const label = escapeHtml(arrival.routeLabel || `Arrival ${arrival.seq}`);
    const fastBadge = arrival.isFast ? `<span class="fast-route">（快車）</span>` : "";
    return `
      <article class="eta-card" data-arrival-id="${escapeHtml(arrival.id)}" aria-selected="${selected}" tabindex="0">
        <div class="seq"><span>${label}${fastBadge}</span><span>${selected ? "Selected" : ""}</span></div>
        <p class="minutes"><span>${minutesText}</span><span class="minutes-unit">${unit}</span></p>
        <p class="time">${arrival.time ? formatTime(arrival.time) : "Time unavailable"}</p>
        <p class="remark">${escapeHtml(arrival.remark)}</p>
      </article>
    `;
  }).join("");

  renderReminder(selectedArrival());
}

function scrollToEtaAfterRouteChoice() {
  if (!state.shouldScrollToEta) return;
  state.shouldScrollToEta = false;
  requestAnimationFrame(() => scrollToEtaSection("smooth"));
  setTimeout(() => scrollToEtaSection("auto"), 550);
}

function scrollToEtaSection(behavior) {
  const target = els.trafficWarning || els.reminderPanel || els.etaList;
  if (!target) return;
  const top = Math.max(0, window.pageYOffset + target.getBoundingClientRect().top - 8);
  window.scrollTo({ top, behavior });
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
  const reminderTitle = arrival.minutes <= 0
    ? "巴士唔等你 菜菜都會等你❤️"
    : isPastLeaveTime
      ? "辛苦牛牛 開風扇搵遮陰 耐心等等"
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

function updateDayCounter() {
  const start = new Date(2026, 4, 19);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = Math.max(1, Math.floor((today - start) / 86400000) + 1);
  els.dayCounter.textContent = `💕 Day - ${day}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

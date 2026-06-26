# HK Route ETA

A small browser app for live Hong Kong arrivals on:

- KMB 72X
- KMB 271
- Green Minibus 74 in Kowloon

The app uses fixed personal trip presets and only fetches the configured stop for
each preset.

Presets:

返工🥺:

- KMB 271: `屋企🥬🐮返大埔`, inbound stop 13
- KMB 72X: `屋企🥬🐮返大埔`, inbound stop 7
- KMB all matching routes: `屋企🥬🐮返油麻地`, Nelson Street MK514/MK515 to Wing Sing Lane YT544/YT542, arrivals within 10 minutes
- KMB 271: `油麻地返大埔`, inbound stop 10

返屋企食菜🥬:

- KMB 271: `大埔返屋企🥬🐮`, outbound stop 7
- KMB 72X: `大埔返屋企🥬🐮`, outbound stop 7
- 小巴74: `油麻地返屋企🥬🐮`, stop 8

Click an arrival to select a target bus. The reminder panel counts down to the
time to leave home, office, or go downstairs.

Data comes from the official public APIs surfaced through DATA.GOV.HK:

- KMB/LWB ETA: `https://data.etabus.gov.hk/v1/transport/kmb`
- GMB ETA: `https://data.etagmb.gov.hk`

## Run

```sh
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

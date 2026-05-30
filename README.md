# HabitFlow API

HabitFlow is a backend REST API designed for tracking habits, measuring streaks, and maintaining daily logs.

## Phase 11: API Response Reference (All Routes)

| Method | Route | Auth | Query Params | Description |
|---|---|---|---|---|
| POST | `/api/auth/register` | ❌ | — | Register user |
| POST | `/api/auth/login` | ❌ | — | Login + get JWT |
| POST | `/api/habits` | ✅ | — | Create habit |
| GET | `/api/habits` | ✅ | `tag`, `page`, `limit` | Get all + filter + paginate |
| GET | `/api/habits/:id` | ✅ | — | Get one + streak |
| PUT | `/api/habits/:id` | ✅ | — | Update habit |
| DELETE | `/api/habits/:id` | ✅ | — | Delete + cascade logs |
| POST | `/api/habits/:id/track` | ✅ | — | Mark done today |
| GET | `/api/habits/:id/history` | ✅ | — | Last 7 days logs |

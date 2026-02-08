# Quick Start - New Features Guide

## 🎯 What's New?

Your Task Manager now has **Edit**, **Filter**, and **Sort** features!

---

## 🔥 Quick How-To

### Filter Tasks (Top Buttons)
```
[All] [Pending] [Completed] [📅 Sort by Date]
```
- Click any button to filter instantly
- Active button shows in color
- Filter persists until you change it

### Sort Tasks
Click **[📅 Sort by Date]** to sort by due date earliest → latest

### Edit a Task
1. Click **[✏️ Edit]** on any task
2. Change title, description, or date
3. Click **[Save]** or **[Cancel]**

### Mark Done / Undo
- Click **[✓ Done]** to complete
- Click **[↩️ Undo]** to revert to pending
- Completed tasks show grayed out with strikethrough

### Delete Task
Click **[🗑️ Delete]** to remove

---

## 📌 UI Icons

| Icon | Meaning |
|------|---------|
| ✏️ | Edit task |
| ✓ | Mark as done |
| ↩️ | Undo (revert to pending) |
| 🗑️ | Delete |
| 📅 | Due date / Sort |

---

## 🎨 Status Colors

- **Yellow/Orange Badge:** PENDING task
- **Green Badge:** COMPLETED task
- **Strikethrough Title:** Task is done
- **Light Green Background:** Completed task

---

## ⚡ Test the Features (30 seconds)

You already have sample tasks! Try:

1. Click **[Pending]** filter → See "Team project"
2. Click **[Completed]** filter → See 3 done tasks  
3. Click **[All]** filter → Back to all 4 tasks
4. Click **[📅 Sort by Date]** → Reorder by due date
5. Click **[✏️ Edit]** → Change a task name
6. Click **[✓ Done]** → Mark as complete
7. Click **[↩️ Undo]** → Revert it

All changes save to backend instantly! ✨

---

## 🔧 How It Works

### Frontend
- All filtering/sorting happens in the browser (instant)
- Edit form appears inline when you click "Edit"
- Changes sent to backend via secure HTTP

### Backend
- H2 in-memory database on port 8081
- Tasks persist in memory (cleared on restart - that's OK for dev)
- All CRUD operations working perfectly

---

## ✅ You're All Set!

Everything works end-to-end:
- **Frontend:** http://localhost:4200 ✅
- **Backend:** http://localhost:8081 ✅  
- **Features:** All implemented ✅

Just run both servers and go to http://localhost:4200

---

**Pro Tips:**
- Empty filter = no results? Try "All" filter!
- Want persistent data? Switch to MySQL (docs included)
- Dates auto-validate - can't pick past dates
- Refreshing page keeps your filter/sort (locally)

Happy task managing! 🚀

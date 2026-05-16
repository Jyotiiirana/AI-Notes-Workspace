"use client"
import {
  Sparkles,
  Save,
  Tag,
  WandSparkles,
} from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function WorkspacePage() {
      const generateSummary = async () => {
    if (!content) {
      toast.error("Please write some content first")
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
          Summarize the following note in a professional way:

          ${content}
          `,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSummary(data.response)
        toast.success("Summary generated successfully")
      } else {
        toast.error("Failed to generate summary")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  const handleActionItems = async () => {
  try {
    setLoading(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
prompt: `Extract only short action items from this note.

Rules:
- Return ONLY bullet points
- No summary
- No headings
- No markdown
- No explanation

Note:
${content}`,
      }),
    })

    const data = await response.json()

    if (data.success) {
setActionItems(
  data.response
    .split("\n")
    .filter(
      (item: string) =>
        item.trim() !== ""
    )
)    }
  } catch (error) {
    console.log(error)
  }finally {
  setLoading(false)
}
}
const suggestTitle = async () => {
  
  try {
    setLoading(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
prompt: `Suggest ONE short clean professional title for this note.

Rules:
- Maximum 6 words
- No quotation marks
- No explanation

Note:
${content}`,
      }),
    })

    const data = await response.json()

    if (data.success) {
      setTitle(data.response)
    }
  } catch (error) {
    console.log(error)
  }finally {
  setLoading(false)
}
}
      const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [lastSaved, setLastSaved] = useState("")
  const [summary, setSummary] = useState("")
  const [actionItems, setActionItems] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
const [activeNoteId, setActiveNoteId] = useState("")
const createNewNote = () => {
  // SAVE CURRENT NOTE FIRST
  if (activeNoteId) {
    const updatedExistingNotes = notes.map((note) =>
      note.id === activeNoteId
        ? {
            ...note,
            title: title || "Untitled Note",
            content,
          }
        : note
    )

    setNotes(updatedExistingNotes)

    localStorage.setItem(
      "peblo-notes",
      JSON.stringify(updatedExistingNotes)
    )
  }

  // CREATE NEW NOTE
  const newNote = {
    id: Date.now().toString(),
    title: "Untitled Note",
    content: "",
  }

const updatedNotes = [
  newNote,
  ...(activeNoteId
    ? notes.map((note) =>
        note.id === activeNoteId
          ? {
              ...note,
              title:
                title || "Untitled Note",
              content,
               summary,
    actionItems,
            }
          : note
      )
    : notes),
]
  setNotes(updatedNotes)
  setActiveNoteId(newNote.id)

  setTitle("")
  setContent("")
  setSummary("")
  setActionItems([])

  localStorage.setItem(
    "peblo-notes",
    JSON.stringify(updatedNotes)
  )

  toast.success("New note created")
}
const deleteNote = (id: string) => {
  const updatedNotes = notes.filter(
    (note) => note.id !== id
  )

  setNotes(updatedNotes)

  localStorage.setItem(
    "peblo-notes",
    JSON.stringify(updatedNotes)
  )

  if (updatedNotes.length > 0) {
    const firstNote = updatedNotes[0]

    setActiveNoteId(firstNote.id)
    setTitle(firstNote.title)
    setContent(firstNote.content)
  } else {
    setActiveNoteId("")
    setTitle("")
    setContent("")
  }
}
const filteredNotes = notes.filter((note) =>
  note.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase()) ||
  note.content
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        localStorage.setItem(
          "peblo-note",
          
          JSON.stringify({
            title,
            content,
          })
        )
        if (activeNoteId) {
const updatedNotes = notes.map((note) =>    note.id === activeNoteId
      ? {
          ...note,
          title,
          content,
        }
      : note
  )

  setNotes(updatedNotes)

  localStorage.setItem(
    "peblo-notes",
    JSON.stringify(updatedNotes)
  )
}

        const now = new Date().toLocaleTimeString()

        setLastSaved(now)

        toast.success("Saved")
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [title, content])
  useEffect(() => {
  const savedNote = localStorage.getItem("peblo-note")

  if (savedNote) {
    const parsed = JSON.parse(savedNote)

    setTitle(parsed.title || "")
    setContent(parsed.content || "")
  }
  const savedNotes = localStorage.getItem("peblo-notes")

if (savedNotes) {
  const parsedNotes = JSON.parse(savedNotes)

  setNotes(parsedNotes)

  if (parsedNotes.length > 0) {
    const firstNote = parsedNotes[0]

    setActiveNoteId(firstNote.id)
    setTitle(firstNote.title)
    setContent(firstNote.content)
  }
}
}, [])
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-8 dark:from-black dark:to-zinc-900">
      
      {/* TOP BAR */}
      <div className="mb-8 flex items-center justify-between">
        
        <div>
          <h1 className="text-4xl font-bold">
            AI Note Workspace
          </h1>

          <p className="mt-2 text-gray-500">
Your intelligent AI-powered productivity workspace          </p>
        </div>

        <div className="flex items-center gap-4">
  
  <ThemeToggle />

  <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-600">
    <Save size={16} />
    {lastSaved
      ? `Saved at ${lastSaved}`
      : "Auto-save enabled"}
  </div>
</div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-4">
        {/* NOTES SIDEBAR */}
<div className="rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
  
  <div className="mb-5 flex items-center justify-between">
    <h2 className="text-xl font-bold">
      Notes
    </h2>

    <button
  onClick={() => {
    createNewNote()
  }}
  className="rounded-xl bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black"
>
  New
</button>
  </div>
<input
  type="text"
  placeholder="Search notes..."
  value={searchQuery}
  onChange={(e) =>
    setSearchQuery(e.target.value)
  }
  className="mb-4 w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 outline-none placeholder:text-gray-400 dark:border-white/10"
/>
  <div className="space-y-3">
{filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (      <button
        key={note.id}
        onClick={() => {
  setActiveNoteId(note.id)
  setTitle(note.title)
  setContent(note.content)

  setSummary(note.summary || "")

  setActionItems(
    note.actionItems || []
  )
}}
        className={`w-full rounded-2xl border p-4 text-left transition ${
          activeNoteId === note.id
            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
            : "hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
  <h3 className="font-semibold">
    {note.title}
  </h3>

  <button
    onClick={(e) => {
      e.stopPropagation()
      deleteNote(note.id)
    }}
    className="text-sm opacity-60 hover:opacity-100"
  >
    ✕
  </button>
  
</div>

        <p className="mt-1 line-clamp-2 text-sm opacity-70">
{note.content?.trim()
  ? note.content
  : "No content yet"}        </p>
      </button>
          ))
  ) : (
    <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-gray-500">
      No notes found
    </div>
  )}
</div>
    
</div>
        
        {/* EDITOR */}
        <div className="xl:col-span-2 rounded-3xl border border-black/5 bg-white/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          
          {/* TITLE */}
          <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Untitled Note"
  className="w-full border-none bg-transparent text-5xl font-bold outline-none placeholder:text-gray-400"
/>

          {/* TAGS */}
          <div className="mt-6 flex flex-wrap gap-3">
            
            <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              <Tag size={14} />
              Productivity
            </div>

            <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              <Tag size={14} />
              AI
            </div>

            <button className="rounded-full border border-dashed px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
              + Add Tag
            </button>
          </div>

          {/* TEXTAREA */}
          <div className="mt-8">
            <textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Start writing your thoughts here..."
  className="min-h-[500px] w-full resize-none rounded-3xl border border-black/5 bg-transparent p-6 text-lg outline-none placeholder:text-gray-400 dark:border-white/10"
/>
          </div>
        </div>

        {/* AI PANEL */}
        <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-pink-500 p-3 text-white">
              <Sparkles size={20} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                AI Assistant
              </h2>

              <p className="text-sm text-gray-500">
                Generate summaries instantly
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 space-y-4">
            
        <button
  onClick={generateSummary}
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-white transition hover:scale-[1.02] disabled:opacity-50 dark:bg-white dark:text-black"
>
  <WandSparkles size={18} />

  {loading ? "Generating..." : "Generate Summary"}
</button>

            <button
  onClick={handleActionItems}
  disabled={loading}
  className="w-full rounded-2xl border px-5 py-4 transition hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/10"
>
  {loading ? "Generating..." : "Extract Action Items"}
</button>
<button
  onClick={suggestTitle}
  disabled={loading}
  className="w-full rounded-2xl border px-5 py-4 transition hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/10"
>
  {loading ? "Generating..." : "Suggest Title"}
</button>
          </div>

          {/* AI OUTPUT */}
          <div className="mt-10">
            
            <h3 className="text-lg font-semibold">
              AI Summary
            </h3>

            <div className="mt-4 rounded-2xl border p-5">
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                {summary || "Your AI-generated summary will appear here after analyzing the note content."}
              </p>
            </div>
          </div>

          {/* ACTION ITEMS */}
          <div className="mt-8">
            
            <h3 className="text-lg font-semibold">
              Action Items
            </h3>

            <div className="space-y-3">
  {actionItems.length > 0 ? (
    actionItems.map((item, index) => (
      <div key={index} className="rounded-2xl border p-4">
        • {item}
      </div>
    ))
  ) : (
    <div className="rounded-2xl border p-4 text-gray-500">
      No action items generated yet.
    </div>
  )}
</div>
          </div>
        </div>
      </div>
    </main>
  )
}
"use client"
import {
  Brain,
  FileText,
  Sparkles,
  BarChart3,
  Search,
  Bell,
} from "lucide-react"

import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-zinc-900 pink:from-rose-50 pink:to-pink-100">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between border-b border-black/5 px-8 py-5 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            NeuroNotes AI
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            AI-powered collaborative notes platform
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full border p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <Search size={18} />
          </button>

          <button className="rounded-full border p-2 hover:bg-black/5 dark:hover:bg-white/10">
            <Bell size={18} />
          </button>

          <ThemeToggle />
        </div>
      </header>

      <div className="flex gap-6">
        
        {/* SIDEBAR */}
        <aside className="hidden min-h-screen w-72 border-r border-black/5 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 lg:block">
          
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-black p-3 text-white dark:bg-white dark:text-black">
                <Brain size={20} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Peblo Notes
                </h2>

                <p className="text-sm text-gray-500">
                  Smart productivity
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-2xl bg-black px-4 py-3 text-white dark:bg-white dark:text-black">
              <FileText size={18} />
              All Notes
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10">
              <Sparkles size={18} />
              AI Summaries
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10">
              <BarChart3 size={18} />
              Insights
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="flex-1 p-8">
          
          {/* HERO */}
          <div className="mb-8 min-h-[260px] rounded-3xl border border-black/5 bg-white/70 p-8 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold leading-tight">
                Organize your ideas with AI-powered productivity
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Create notes, generate AI summaries, track insights and
                collaborate beautifully.
              </p>

              <div className="mt-6 flex gap-4">
                <Link
  href="/workspace"
  className="rounded-2xl bg-black px-6 py-4 text-white inline-block"
>
  Create Note
</Link>

                <button className="rounded-2xl border px-6 py-3 transition hover:bg-black/5 dark:hover:bg-white/10">
                  Explore AI
                </button>
              </div>
            </div>
          </div>

          {/* DASHBOARD CARDS */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            
            <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm text-gray-500">
                Total Notes
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                128
              </h3>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm text-gray-500">
                AI Generations
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                46
              </h3>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm text-gray-500">
                Productivity Score
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                92%
              </h3>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm text-gray-500">
                Weekly Activity
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                +18%
              </h3>
            </div>
          </div>
          {/* RECENT NOTES */}
<div className="mt-10 grid gap-6 lg:grid-cols-3">
  
  <div className="lg:col-span-2 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
    
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-2xl font-semibold">
        Recent Notes
      </h3>

      <button className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
        View All
      </button>
    </div>

    <div className="space-y-4">
      
      <div className="rounded-2xl border p-4 transition hover:bg-black/5 dark:hover:bg-white/5">
        <h4 className="font-semibold">
          Sprint Planning Notes
        </h4>

        <p className="mt-2 text-sm text-gray-500">
          AI summary generated • Updated 2h ago
        </p>
      </div>

      <div className="rounded-2xl border p-4 transition hover:bg-black/5 dark:hover:bg-white/5">
        <h4 className="font-semibold">
          Product Brainstorm
        </h4>

        <p className="mt-2 text-sm text-gray-500">
          12 action items extracted • Updated yesterday
        </p>
      </div>

      <div className="rounded-2xl border p-4 transition hover:bg-black/5 dark:hover:bg-white/5">
        <h4 className="font-semibold">
          AI Research Notes
        </h4>

        <p className="mt-2 text-sm text-gray-500">
          Shared publicly • Updated today
        </p>
      </div>

    </div>
  </div>

  {/* AI ACTIVITY */}
  <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
    
    <h3 className="text-2xl font-semibold">
      AI Activity
    </h3>

    <div className="mt-6 space-y-5">
      
      <div>
        <p className="text-sm text-gray-500">
          Summaries Generated
        </p>

        <h4 className="mt-1 text-3xl font-bold">
          46
        </h4>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Action Items Extracted
        </p>

        <h4 className="mt-1 text-3xl font-bold">
          128
        </h4>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Productivity Boost
        </p>

        <h4 className="mt-1 text-3xl font-bold">
          +32%
        </h4>
      </div>

    </div>
  </div>
</div>
        </section>
      </div>
    </main>
  )
}
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ThemeToggle"; // named export

type Props = { repoUrl: string };

export default function MobileMenu({ repoUrl }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Foco accesible
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-accent/50 active:scale-95 transition"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portal: overlay + drawer van al body (evita clipping por backdrop-blur del header) */}
      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <button
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-[1px]"
              onClick={close}
            />

            {/* Drawer */}
            <aside
              ref={panelRef}
              tabIndex={-1}
              className={`fixed right-0 top-0 z-[101] h-full w-[18rem] sm:w-[20rem]
                          bg-white dark:bg-neutral-900 border-l rounded-l-2xl shadow-xl
                          transform transition-transform duration-200 translate-x-0`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div
                className="flex items-center justify-between px-4 h-12 border-b rounded-tl-2xl"
                style={{ paddingTop: "env(safe-area-inset-top)" }}
              >
                <span className="text-sm font-semibold">Menu</span>
                <button
                  aria-label="Close menu"
                  className="p-2 rounded-md hover:bg-accent/50"
                  onClick={close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav
                className="flex flex-col gap-1 p-3"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                <a
                  href="/"
                  onClick={close}
                  className="px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  /index
                </a>
                <a
                  href="/experiences"
                  onClick={close}
                  className="px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  Experience
                </a>
                <a
                  href="/education"
                  onClick={close}
                  className="px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  Education
                </a>
                <a
                  href="/projects"
                  onClick={close}
                  className="px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  Projects
                </a>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                  className="px-3 py-2 rounded-md hover:bg-accent/50"
                >
                  GitHub
                </a>

                <div className="mt-3 border-t pt-3">
                  <ModeToggle />
                </div>
              </nav>
            </aside>
          </>,
          document.body,
        )}
    </>
  );
}

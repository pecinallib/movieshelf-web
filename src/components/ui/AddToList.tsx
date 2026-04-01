import { useEffect, useState, useRef } from 'react';
import { getMyLists, addItemToList, createList } from '../../services/lists';
import { List } from '../../types/models';
import { List as ListIcon, Plus, Check, X } from 'lucide-react';

interface AddToListProps {
  tmdbId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
}

export function AddToList({
  tmdbId,
  mediaType,
  title,
  posterPath,
}: AddToListProps) {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [addedTo, setAddedTo] = useState<string[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [creating, setCreating] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function loadLists() {
    setLoading(true);
    getMyLists()
      .then(setLists)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (open) loadLists();
  }, [open]);

  async function handleAdd(listId: string) {
    try {
      await addItemToList(listId, { tmdbId, mediaType, title, posterPath });
      setAddedTo((prev) => [...prev, listId]);
    } catch {
      // Item já existe na lista
    }
  }

  async function handleCreateAndAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newListName.trim()) return;
    setCreating(true);

    try {
      const newList = await createList({ name: newListName.trim() });
      await addItemToList(newList.id, { tmdbId, mediaType, title, posterPath });
      setAddedTo((prev) => [...prev, newList.id]);
      setNewListName('');
      setShowNewForm(false);
      loadLists();
    } catch (error) {
      console.error('Erro ao criar lista:', error);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-6 py-3 bg-[#18181f] text-zinc-300 border border-[#27272f] hover:border-gold-300/50 rounded-xl font-medium transition-colors cursor-pointer"
      >
        <ListIcon className="w-5 h-5" />
        Adicionar à lista
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-72 bg-[#0f0f14] border border-[#27272f] rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272f]">
            <span className="text-white text-sm font-medium">
              Minhas listas
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-6 text-center text-zinc-400 text-sm">
                Carregando...
              </div>
            ) : lists.length > 0 ? (
              lists.map((list) => {
                const added = addedTo.includes(list.id);
                return (
                  <button
                    key={list.id}
                    onClick={() => !added && handleAdd(list.id)}
                    disabled={added}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                      added
                        ? 'bg-gold-300/10 text-gold-300'
                        : 'text-zinc-300 hover:bg-[#18181f] cursor-pointer'
                    }`}
                  >
                    <span className="text-sm truncate">{list.name}</span>
                    {added && (
                      <Check className="w-4 h-4 text-gold-300 shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-zinc-400 text-sm">
                Nenhuma lista
              </div>
            )}
          </div>

          <div className="border-t border-[#27272f]">
            {showNewForm ? (
              <form onSubmit={handleCreateAndAdd} className="p-3 flex gap-2">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Nome da lista"
                  autoFocus
                  className="flex-1 px-3 py-2 bg-[#18181f] border border-[#27272f] rounded-lg text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-gold-300"
                />
                <button
                  type="submit"
                  disabled={creating}
                  className="px-3 py-2 btn-gold rounded-lg text-sm cursor-pointer"
                >
                  {creating ? '...' : 'Criar'}
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowNewForm(true)}
                className="w-full flex items-center gap-2 px-4 py-3 text-gold-300 hover:bg-[#18181f] text-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nova lista
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

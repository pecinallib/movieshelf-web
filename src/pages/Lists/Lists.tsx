import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyLists, createList, deleteList } from '../../services/lists';
import { List } from '../../types/models';
import { List as ListIcon, Plus, Trash2, Film } from 'lucide-react';

export function Lists() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  function loadLists() {
    setLoading(true);
    getMyLists()
      .then(setLists)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadLists();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);

    try {
      await createList({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setName('');
      setDescription('');
      setShowForm(false);
      loadLists();
    } catch (error) {
      console.error('Erro ao criar lista:', error);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que quer deletar esta lista?')) return;

    try {
      await deleteList(id);
      loadLists();
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ListIcon className="w-6 h-6 text-purple-500" />
            <h1 className="text-2xl font-bold text-white">Minhas Listas</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nova Lista
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 space-y-4"
          >
            <div>
              <label className="block text-slate-300 text-sm mb-2">
                Nome da lista
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ex: Pra ver no fds"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Uma breve descrição"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                {creating ? 'Criando...' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-400">Carregando...</div>
        ) : lists.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link to={`/lists/${list.id}`} className="flex-1">
                    <h3 className="text-white font-semibold text-lg hover:text-purple-400 transition-colors">
                      {list.name}
                    </h3>
                    {list.description && (
                      <p className="text-slate-400 text-sm mt-1">
                        {list.description}
                      </p>
                    )}
                  </Link>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Film className="w-4 h-4" />
                  <span>{list._count?.items || 0} itens</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ListIcon className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400">Nenhuma lista criada</p>
            <p className="text-slate-500 text-sm mt-1">
              Crie uma lista para organizar seus filmes e séries
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

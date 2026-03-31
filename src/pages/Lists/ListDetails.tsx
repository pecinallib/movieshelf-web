import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getListById, removeItemFromList } from '../../services/lists';
import { List } from '../../types/models';
import { ArrowLeft, Trash2 } from 'lucide-react';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export function ListDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);

  function loadList() {
    if (!id) return;
    setLoading(true);
    getListById(id)
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadList();
  }, [id]);

  async function handleRemoveItem(itemId: string) {
    if (!id) return;
    try {
      await removeItemFromList(id, itemId);
      loadList();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Lista não encontrada
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/lists')}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para listas
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{list.name}</h1>
          {list.description && (
            <p className="text-slate-400 mt-1">{list.description}</p>
          )}
          <p className="text-slate-500 text-sm mt-2">
            {list.items?.length || 0} itens
          </p>
        </div>

        {list.items && list.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {list.items.map((item) => (
              <div key={item.id} className="relative group">
                <Link to={`/${item.mediaType}/${item.tmdbId}`}>
                  <div className="overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
                    {item.posterPath ? (
                      <img
                        src={`${IMG_BASE}${item.posterPath}`}
                        alt={item.title}
                        className="w-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full aspect-2/3 bg-slate-700 flex items-center justify-center text-slate-500 text-sm">
                        Sem imagem
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm truncate">
                        {item.title}
                      </h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                        {item.mediaType === 'movie' ? 'Filme' : 'Série'}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-2 right-2 p-2 bg-black/60 rounded-lg text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">Lista vazia</p>
            <Link
              to="/"
              className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
            >
              Explorar filmes e séries para adicionar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

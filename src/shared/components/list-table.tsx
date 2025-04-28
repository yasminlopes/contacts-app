import { BookDashed } from 'lucide-react';

interface Props<T> {
  title?: string;
  data: T[];
  columns: ListColumn<T>[];
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  loading?: boolean;
}

export default function ListTable<T>({
  title,
  data,
  columns,
  actions,
  emptyMessage = 'Nenhum item encontrado.',
  loading
}: Props<T>) {
  const isEmpty = !data || data.length === 0;

  if (loading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="w-full max-w-4xl border border-dashed border-gray-300 rounded-box p-10 text-center text-base-content opacity-60">
          <BookDashed size={64} className="mb-4 text-gray-300 mx-auto" />
          <p className="text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="w-full max-w-4xl border border-dashed border-gray-300 rounded-box p-10 text-center text-base-content opacity-60">
          <BookDashed size={64} className="mb-4 text-gray-300 mx-auto" />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md divide-y divide-base-200 w-full max-w-6xl mx-auto overflow-x-auto">
      {title && (
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase font-semibold">
          {title}
        </li>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="list-row p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                {columns.map((_, idx) => (
                  <div key={idx} className="w-24 h-4 bg-gray-200 rounded-md"></div>
                ))}
              </div>

              {actions && (
                <div className="flex gap-2 items-center justify-end">
                  <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
                </div>
              )}
            </li>
          ))}
        </div>
      ) : (
        data.map((item, index) => (
          <li
            key={index}
            className="list-row p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              {columns.map((col, idx) => (
                <div key={idx} className="break-words">{col.render(item)}</div>
              ))}
            </div>

            {actions && (
              <div className="flex gap-2 items-center justify-end">
                {actions(item)}
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon = "📭", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/50 px-6 py-12 text-center">
      <span className="mb-3 text-4xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-sm text-gray-500">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 min-h-[40px] rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

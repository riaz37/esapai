export function CommitmentCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-light-gray-90">{desc}</p>
        </div>
    );
}

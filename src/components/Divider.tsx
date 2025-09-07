export const Divider = ({ text }: { text: string }) => (
    <div className="relative my-8 w-full">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{text}</span>
        </div>
    </div>
);

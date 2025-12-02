"use client";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

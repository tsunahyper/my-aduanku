import React from 'react'
import AddUserForms from './AddUserForms'

interface AddUserPopupProps {
  onClose?: () => void
}

const AddUserPopup = ({ onClose }: AddUserPopupProps) => { 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="flex flex-col gap-8 bg-white p-8 rounded-lg shadow-lg w-1/2 max-h-[600px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-bold text-black">Forms - Add User</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <AddUserForms onClose={onClose} />
      </div>
    </div>
  );
};

export default AddUserPopup;

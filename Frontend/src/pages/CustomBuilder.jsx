import { useState } from 'react';

const CustomBuilder = () => {
  const [design, setDesign] = useState({
    chainType: 'simple',
    pendantType: 'heart',
    color: 'gold'
  });

  const chainTypes = ['Simple', 'Box', 'Rope', 'Cable'];
  const pendantTypes = ['Heart', 'Star', 'Circle', 'Cross', 'Moon'];
  const colors = ['Gold', 'Silver', 'Rose Gold'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Custom Jewelry Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-xl font-bold mb-6">Customize Your Design</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chain Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {chainTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setDesign({ ...design, chainType: type.toLowerCase() })}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        design.chainType === type.toLowerCase()
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pendant Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {pendantTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setDesign({ ...design, pendantType: type.toLowerCase() })}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        design.pendantType === type.toLowerCase()
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDesign({ ...design, color: color.toLowerCase().replace(' ', '-') })}
                      className={`p-3 border-2 rounded-lg transition-colors ${
                        design.color === color.toLowerCase().replace(' ', '-')
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="w-full btn-primary">
            Save Custom Design
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-12 mb-6">
              <div className="w-64 h-64 flex items-center justify-center">
                <div className="text-6xl">💍</div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Your Custom Design</p>
              <p className="text-sm text-gray-600">Chain: {design.chainType}</p>
              <p className="text-sm text-gray-600">Pendant: {design.pendantType}</p>
              <p className="text-sm text-gray-600">Color: {design.color}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📝 Note</h3>
        <p className="text-blue-800">
          This is a preview of the Custom Jewelry Builder feature. In the full version, 
          you'll be able to see real-time 3D previews of your custom jewelry designs 
          and place orders for custom pieces.
        </p>
      </div>
    </div>
  );
};

export default CustomBuilder;
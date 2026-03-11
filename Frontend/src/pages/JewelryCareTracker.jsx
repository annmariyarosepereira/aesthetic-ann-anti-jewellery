import { useState, useEffect } from 'react';
import { careAPI, productAPI } from '../utils/api';

const JewelryCareTracker = () => {
  const [careItems, setCareItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    purchaseDate: '',
    lastCleaned: '',
    notes: ''
  });

  useEffect(() => {
    fetchCareItems();
    fetchProducts();
  }, []);

  const fetchCareItems = async () => {
    try {
      const { data } = await careAPI.getMyCareItems();
      setCareItems(data);
    } catch (error) {
      console.error('Error fetching care items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await careAPI.addCareItem(formData);
      alert('Jewelry added to care tracker!');
      setFormData({ product: '', purchaseDate: '', lastCleaned: '', notes: '' });
      setShowAddForm(false);
      fetchCareItems();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        await careAPI.deleteCareItem(id);
        fetchCareItems();
      } catch (error) {
        alert('Failed to delete item');
      }
    }
  };

  const handleUpdateCleaning = async (id) => {
    try {
      await careAPI.updateCareItem(id, { lastCleaned: new Date().toISOString() });
      alert('Cleaning date updated!');
      fetchCareItems();
    } catch (error) {
      alert('Failed to update');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Jewelry Care Tracker</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Jewelry'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add Jewelry to Tracker</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Jewelry
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                required
                className="input-field"
              >
                <option value="">Choose a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Cleaned (Optional)
              </label>
              <input
                type="date"
                value={formData.lastCleaned}
                onChange={(e) => setFormData({ ...formData, lastCleaned: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="input-field"
                placeholder="Any care notes or reminders..."
              />
            </div>

            <button type="submit" className="btn-primary">
              Add to Tracker
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : careItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-4">No jewelry in your care tracker yet</p>
          <p className="text-gray-500">Add your jewelry to keep track of maintenance</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    {item.product?.name || 'Product'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                  </p>
                  {item.lastCleaned && (
                    <p className="text-sm text-gray-600">
                      Last Cleaned: {new Date(item.lastCleaned).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {item.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">{item.notes}</p>
                </div>
              )}

              {item.product?.careInstructions && (
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Care Instructions:</p>
                  <p className="text-sm text-blue-800">{item.product.careInstructions}</p>
                </div>
              )}

              <button
                onClick={() => handleUpdateCleaning(item._id)}
                className="w-full btn-secondary text-sm"
              >
                Mark as Cleaned Today
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JewelryCareTracker;
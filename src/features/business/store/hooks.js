import {useState, useEffect} from 'react';
import {fetchMyStore, saveStore, uploadStoreImage, deleteStoreImage} from '@/api/store';

export const useStoreInfo = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyStore();
        setStore(data);
      } catch {}
    })();
  }, []);

  return {store, setStore};
};

export const useSaveStore = () => {
  const [loading, setLoading] = useState(false);
  const save = async (payload) => {
    setLoading(true);
    try {
      return await saveStore(payload);
    } finally {
      setLoading(false);
    }
  };
  return {save, loading};
};

export const useUploadStoreImage = () => {
  const [uploading, setUploading] = useState(false);
  const upload = async (file) => {
    setUploading(true);
    try {
      return await uploadStoreImage(file);
    } finally {
      setUploading(false);
    }
  };
  return {upload, uploading};
};

export const useDeleteStoreImage = () => {
  const [deleting, setDeleting] = useState(false);
  const remove = async (imageId) => {
    setDeleting(true);
    try {
      return await deleteStoreImage(imageId);
    } finally {
      setDeleting(false);
    }
  };
  return {remove, deleting};
};

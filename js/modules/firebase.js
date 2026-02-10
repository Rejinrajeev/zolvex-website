import { firebaseConfig } from '../../firebase/config.js';

export class FirebaseManager {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  async init() {
    try {
      // Check if Firebase is already loaded
      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded. Loading dynamically...');
        await this.loadFirebaseSDK();
      }
      
      // Initialize Firebase
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
      
      this.db = firebase.firestore();
      this.initialized = true;
      
      console.log('Firebase initialized successfully');
      return true;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return false;
    }
  }

  async loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
      script.onload = () => {
        const script2 = document.createElement('script');
        script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
        script2.onload = resolve;
        script2.onerror = reject;
        document.head.appendChild(script2);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async saveBooking(bookingData) {
    if (!this.initialized) {
      console.warn('Firebase not initialized. Using localStorage fallback.');
      return this.saveToLocalStorage(bookingData);
    }

    try {
      const docRef = await this.db.collection('bookings').add({
        ...bookingData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('Booking saved to Firestore with ID:', docRef.id);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      // Fallback to localStorage
      return this.saveToLocalStorage(bookingData);
    }
  }

  saveToLocalStorage(bookingData) {
    try {
      const bookings = JSON.parse(localStorage.getItem('zolvex_bookings') || '[]');
      bookingData.localId = 'LOCAL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      bookings.push(bookingData);
      localStorage.setItem('zolvex_bookings', JSON.stringify(bookings));
      
      return { success: true, id: bookingData.localId, isLocal: true };
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return { success: false, error: error.message };
    }
  }

  async getBookings(limit = 50) {
    if (!this.initialized) {
      return this.getLocalBookings();
    }

    try {
      const snapshot = await this.db.collection('bookings')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return this.getLocalBookings();
    }
  }

  getLocalBookings() {
    try {
      return JSON.parse(localStorage.getItem('zolvex_bookings') || '[]');
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  async syncLocalBookings() {
    if (!this.initialized) return { synced: 0, failed: 0 };
    
    const localBookings = this.getLocalBookings();
    const unsyncedBookings = localBookings.filter(booking => !booking.synced);
    
    let synced = 0;
    let failed = 0;
    
    for (const booking of unsyncedBookings) {
      try {
        await this.saveBooking(booking);
        booking.synced = true;
        synced++;
      } catch (error) {
        console.error('Failed to sync booking:', booking.localId, error);
        failed++;
      }
    }
    
    // Update localStorage
    if (synced > 0) {
      localStorage.setItem('zolvex_bookings', JSON.stringify(localBookings));
    }
    
    return { synced, failed };
  }

  isInitialized() {
    return this.initialized;
  }

  getDatabase() {
    return this.db;
  }
}
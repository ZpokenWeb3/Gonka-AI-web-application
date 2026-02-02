
(function setupPolyfills() {
  const isServer = typeof window === 'undefined' && typeof global !== 'undefined';
  
  if (isServer) {
    const mockIDBFactory = {
      open: () => {
        return {
          onerror: null,
          onsuccess: null,
          onupgradeneeded: null,
          result: null,
          error: null,
          readyState: 'done',
          transaction: null,
          source: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        };
      },
      deleteDatabase: () => {
        return {
          onerror: null,
          onsuccess: null,
          onblocked: null,
          result: null,
          error: null,
          readyState: 'done',
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        };
      },
      cmp: () => 0,
    };

    if (!global.indexedDB) {
      (global as any).indexedDB = mockIDBFactory;
    }

    if (typeof globalThis !== 'undefined' && !globalThis.indexedDB) {
      (globalThis as any).indexedDB = mockIDBFactory;
    }
  }
})();


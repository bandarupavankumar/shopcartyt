// Mock Stripe implementation for development
const mockStripe = {
  customers: {
    list: async () => ({ data: [] })
  },
  checkout: {
    sessions: {
      create: async () => ({ url: '/order-success' })
    }
  }
};

export default mockStripe;

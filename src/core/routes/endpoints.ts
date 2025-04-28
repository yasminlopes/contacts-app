export const API_ENDPOINS = {
  contacts: {
    list: '/contact/search',
    viewPhoto: (guid: string) => `/contact/${guid}/photo`,
    create: '/contact',
    delete: (guid: string) => `/contact/${guid}`,
    update: (guid: string) => `/contact/${guid}`,
    updatePhoto: (guid: string) => `/contact/${guid}/photo`,
    deletePhoto: (guid: string) => `/contact/${guid}/photo`,
  },
};
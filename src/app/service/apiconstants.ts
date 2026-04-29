export const APIConstants = {
    Login: "/user/loginAdmin",
    ValidateToken: "/user/validate-token",
    Logout: "/user/logout",
    UserById: "/user/userById",
    
    // Role Management APIs
    RoleCreate: "/role/create",
    RoleUpdate: "/role/update",
    RoleGetAll: "/role/all",
    RoleGetById: "/role/getbyid",
    
    // Country Management APIs
    CountryCreate: "/countries/create",
    CountryUpdate: "/countries/update",
    CountryGetAll: "/countries/getall",
    CountryGetById: "/countries/getbyid",
    
    // State Management APIs
    StateCreate: "/states/create",
    StateUpdate: "/states/update",
    StateGetAll: "/states/getall",
    StateGetById: "/states/getbyid",
    StateGetByCountry: "/states/getbycountry",
    
    // City Management APIs
    CityCreate: "/cities/create",
    CityUpdate: "/cities/update",
    CityGetAll: "/cities/getall",
    CityGetById: "/cities/getbyid",
    CityGetByState: "/cities/getbystate",
    
    // Notifications Management APIs
    NotificationCreate: "/notifications/create",
    NotificationUpdate: "/notifications/update",
    NotificationGetById: "/notifications/getbyid",
    NotificationGetAll: "/notifications/getall",
    
    // Notification Map User APIs
    NotificationMapCreate: "/notification-map-user/create",
    NotificationMapUpdate: "/notification-map-user/update",
    NotificationMapGetAll: "/notification-map-user/getall",
    NotificationMapGetById: "/notification-map-user/getbyid",
    
    // Adviser Management APIs
    AdviserCreate: "/adviser/create",
    AdviserUpdate: "/adviser/update",
    AdviserGetAll: "/adviser/all",
    AdviserGetById: "/adviser/getbyid",
    
    // Employee Management APIs
    EmployeeCreate: "/employee/create",
    EmployeeUpdate: "/employee/update",
    EmployeeGetAll: "/employee/all",
    EmployeeGetById: "/employee/getbyid",
    
    // Schedule Call Management APIs (for both Session and Intent Session Call)
    ScheduleCallCreate: "/schedule-call/create",
    ScheduleCallUpdate: "/schedule-call/update",
    ScheduleCallGetAll: "/schedule-call/all",
    ScheduleCallGetById: "/schedule-call/getbyid",
    ScheduleCallDelete: "/schedule-call/delete",
    ScheduleCallUpdateSlotActive: "/schedule-call/update-is-slot-activ",
    ScheduleCallGetByUserIdSlots: "/schedule-call/getbyuseridslots",
    
    // Legacy Session Management APIs (keeping for backward compatibility)
    SessionCreate: "/schedule-call/create",
    SessionUpdate: "/schedule-call/update",
    SessionGetAll: "/schedule-call/all",
    SessionGetById: "/schedule-call/getbyid/",
    SessionDelete: "/schedule-call/delete/",
    
    // Legacy Intent Session Call Management APIs (keeping for backward compatibility)
    IntentSessionCallCreate: "/master/intent-session-call/create",
    IntentSessionCallUpdate: "/master/intent-session-call/update",
    IntentSessionCallGetAll: "/master/intent-session-call/getall",
    IntentSessionCallGetById: "/master/intent-session-call/getbyid/",
    IntentSessionCallDelete: "/master/intent-session-call/delete/",
    
    // Adviser Area of Expertise Management APIs
    AdviserAreaOfExpertiseCreate: "/adviser-area-of-expertise/create",
    AdviserAreaOfExpertiseUpdate: "/adviser-area-of-expertise/update",
    AdviserAreaOfExpertiseGetAll: "/adviser-area-of-expertise/all",
    AdviserAreaOfExpertiseGetById: "/adviser-area-of-expertise/getbyid",
    
    // Adviser Sub Role Management APIs
    AdviserSubRoleCreate: "/adviser-sub-role/create",
    AdviserSubRoleUpdate: "/adviser-sub-role/update",
    AdviserSubRoleGetAll: "/adviser-sub-role/all",
    AdviserSubRoleGetById: "/adviser-sub-role/getbyid",
    
    // Designation Management APIs
    DesignationCreate: "/designation/create",
    DesignationUpdate: "/designation/update",
    DesignationGetAll: "/designation/all",
    DesignationGetById: "/designation/getbyid",
    
    // Language Management APIs
    LanguageCreate: "/languages/create",
    LanguageUpdate: "/languages/update",
    LanguageGetAll: "/languages/all",
    LanguageGetById: "/languages/getbyid",
    
    // Advisor Consulting Fees Management APIs
    AdvisorConsultingFeesCreate: "/advisor-consulting-fees/create",
    AdvisorConsultingFeesUpdate: "/advisor-consulting-fees/update",
    AdvisorConsultingFeesGetAll: "/advisor-consulting-fees/all",
    AdvisorConsultingFeesGetById: "/advisor-consulting-fees/getbyid",
    
    // Gallery Management APIs
    GalleryCreate: "/gallery/create",
    GalleryUpdate: "/gallery/update",
    GalleryGetAll: "/gallery/all",
    GalleryGetById: "/gallery/getbyid",
    GalleryDelete: "/gallery/delete",
    
    // Topic Management APIs
    TopicCreate: "/topic/create",
    TopicUpdate: "/topic/update",
    TopicGetAll: "/topic/all",
    TopicGetById: "/topic/getbyid",
    TopicDelete: "/topic/delete",
    
    // Topics Sub Management APIs
    TopicsSubCreate: "/topics-sub/create",
    TopicsSubUpdate: "/topics-sub/update",
    TopicsSubGetAll: "/topics-sub/all",
    TopicsSubGetById: "/topics-sub/getbyid",
    TopicsSubDelete: "/topics-sub/delete",
    TopicsSubGetByTopicsId: "/topics-sub/getbytopicsid",
    
    // Topics Sub Map With Experts Management APIs
    TopicsSubMapExpertsCreate: "/topics-sub-map-with-experts/create",
    TopicsSubMapExpertsUpdate: "/topics-sub-map-with-experts/update",
    TopicsSubMapExpertsGetAll: "/topics-sub-map-with-experts/all",
    TopicsSubMapExpertsGetById: "/topics-sub-map-with-experts/getbyid",
    TopicsSubMapExpertsDelete: "/topics-sub-map-with-experts/delete",
    TopicsSubMapExpertsGetByTopicsSubId: "/topics-sub-map-with-experts/getbytopicssub",
    TopicsSubMapExpertsGetByAuth: "/topics-sub-map-with-experts/getbyauth",
    TopicsSubMapExpertsGetByExpertId: "/topics-sub-map-with-experts/getbyexpertsid",
    
    // Contact Management APIs
    ContactGetAll: "/contactus/all",
    ContactGetById: "/contactus/getbyid",
    ContactUpdate: "/contactus/update",
    ContactDelete: "/contactus/delete",
    
    // Blog Management APIs
    BlogCreate: "/user/blogs/create",
    BlogUpdate: "/user/blogs/update",
    BlogGetAll: "/user/blogs/getall",
    BlogGetById: "/user/blogs/getbyid",
    BlogDelete: "/user/blogs/delete",
    
    // Webinar Session Management APIs
    WebinarSessionCreate: "/webinar/session/create",
    WebinarSessionUpdate: "/webinar/session/update",
    WebinarSessionGetAll: "/webinar/session/getall",
    WebinarSessionGetById: "/webinar/session/getbyid",
    WebinarSessionDelete: "/webinar/session/delete",
    
    // Transaction/Billing Management APIs
    TransactionGetAll: "/transaction/getall",
    WebinarTransactionGetAll: "/webinar/transaction/getall",
    WebinarTransactionInvoice: "/webinar/transaction/webinar-invoice",
    TransactionInvoice: "/transaction/schedule-call-invoice",
    
    // Dashboard APIs
    AdminDashboard: "/user/admin-dashboard"
}

export class Veriable {
    imgdata: any;
}

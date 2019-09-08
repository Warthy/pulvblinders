const domain = 'https://www.pulvblinders.fr';
export default {
    domain: domain,
    media: domain+'/assets/',
    endpoints : {
        events: {
            bde: domain+'/api/event/bde',
            associations: domain+'/api/event/associations'
        },
        posts: domain+'/api/post',
        sponsors: domain+'/api/sponsor',
    }
};
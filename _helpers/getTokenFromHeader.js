const getTokenFromHeader = (header) => {
    if(header == null || header.authorization == null) {
        next(new Error('Missing header'));
        return; 
    }
    
    const splitted = header.authorization.split(" ");
    
    if(splitted.length < 2) {
        next(new Error('Error'));    
    }

    return splitted[1];
}

module.exports = getTokenFromHeader;
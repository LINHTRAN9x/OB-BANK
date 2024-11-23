import axios_instance from "./axios_instance";

const _getProducts = async () => {
    const url = `/product/find-by-category?category_id=`;
    try {
        const rs = await axios_instance.get(url);
        return rs.data;
    } catch (err) {
        
        return [];
    }
};

export const login = async (data) => {
    const url = `/api/auth/login`;
    try{
        const rs = await axios_instance.post(url,data);
        
        const jwt = rs.data.jwt;
       

        axios_instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        return rs.data;
      
    }catch (err) {
        //console.error('Error:', err);
        if (err.response) {
            // Lấy thông báo lỗi từ response
            //console.error('Error response:', err.response.data);
            return { error: err.response.data };
        } else if (err.request) {
            // Request được gửi đi nhưng không có phản hồi từ server
            //console.error('No response received:', err.request);
        } else {
            // Lỗi xảy ra khi thiết lập request
            //console.error('Error:', err.message);
        }
        return null;
    }
}

export const register = async (data) => {
    const url = `/api/auth/register`;
    try{
        const rs = await axios_instance.post(url,data,{
            headers: {
                'Content-Type': 'application/json', // JSON
            }});
        
        
        return rs.data;
      
    }catch (err) {
        //console.error('Error:', err);
        if (err.response) {
            // Return error details, such as status and message
            return {
              success: false,
              status: err.response.status,
              message: err.response.data.message || 'Registration failed due to server error.',
            };
          } else {
            // Handle network or other unexpected errors
            return {
              success: false,
              message: 'Network error or unexpected issue occurred.',
            };
          }
    }
}

export const getUserProfile = async () => {
    const url = `/api/User`;
    
    
    const jwt = localStorage.getItem('jwtToken');
   

    try {
        const rs = await axios_instance.get(url, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
     
        return rs.data;
     
    } catch (err) {
        //console.error('Error:', err.message);
    }
}

const _getStorys = async () => {
    const url = `/api/Event`;
    try {
        const rs = await axios_instance.get(url);
        return rs.data;
    } catch (err) {
        
        return [];
    }
};
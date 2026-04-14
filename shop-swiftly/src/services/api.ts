import axios from "axios";
import { supabase } from "@/lib/supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
    // Products
    getProducts: async (params?: any) => {
        let query = supabase
            .from('products')
            .select('*, categories(*)');

        if (params?.category) {
            query = query.eq('category_id', params.category);
        }
        if (params?.min_price) {
            query = query.gte('price', params.min_price);
        }
        if (params?.max_price) {
            query = query.lte('price', params.max_price);
        }
        if (params?.search) {
            query = query.ilike('name', `%${params.search}%`);
        }

        if (params?.sort) {
            switch (params.sort) {
                case 'newest': query = query.order('created_at', { ascending: false }); break;
                case 'price_asc': query = query.order('price', { ascending: true }); break;
                case 'price_desc': query = query.order('price', { ascending: false }); break;
                case 'popular': query = query.order('sales_count', { ascending: false }); break;
            }
        }

        const { data, error, count } = await query;
        if (error) throw error;
        
        return {
            products: data,
            total: count || data.length
        };
    },

    getProduct: async (id: string) => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    },

    // Categories
    getCategories: async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return data;
    },

    // Auth (Using Supabase Auth)
    login: async (credentials: any) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        });
        if (error) throw error;

        // Fetch profile to get the custom role
        if (data?.user) {
            console.log('Login successful, fetching profile for user:', data.user.id);
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();
            
            if (profileError) {
                console.error('Error fetching profile:', profileError);
            }
            
            if (profile) {
                console.log('Profile found, role:', profile.role);
                // Merge role into the user object
                (data.user as any).role = profile.role;
            } else {
                console.warn('No profile found for user');
            }
        }

        return data;
    },

    register: async (userData: any) => {
        const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    full_name: userData.full_name,
                }
            }
        });
        if (error) throw error;
        return data;
    },

    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Orders
    createOrder: async (orderData: any) => {
        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    getUserOrders: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
    },

    // Admin API Methods
    getDashboard: async () => {
        // Mocking stats for now or performing aggregations if tables are ready
        const { data: orders, error: ordersErr } = await supabase.from('orders').select('total, status');
        const { count: lowStock, error: stockErr } = await supabase.from('products').select('*', { count: 'exact', head: true }).lt('stock_quantity', 10);
        const { count: newCustomers, error: custErr } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { data: recentOrders, error: recentErr } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);

        if (ordersErr || stockErr || custErr || recentErr) {
            console.error('Error fetching dashboard stats', { ordersErr, stockErr, custErr, recentErr });
        }

        const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) || 0;

        return {
            totalRevenue,
            totalOrders: orders?.length || 0,
            lowStock: lowStock || 0,
            newCustomers: newCustomers || 0,
            recentOrders: recentOrders || []
        };
    },

    getAdminProducts: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .order('name');
        
        if (error) throw error;
        return data;
    },

    createProduct: async (productData: any) => {
        const { id, created_at, updated_at, ...insertData } = productData;
        const { data, error } = await supabase
            .from('products')
            .insert(insertData)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    updateProduct: async (id: string, productData: any) => {
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
            throw new Error("Your login session has expired. Please log out and log back in to save changes.");
        }

        const { id: _, created_at, updated_at, ...updateData } = productData;
        const { data, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
            .select();
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
            throw new Error("Update failed. You might not have permission (check RLS), or the product doesn't exist.");
        }
        
        return data[0];
    },

    deleteProduct: async (id: string) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    },

    getAdminOrders: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
    },

    updateOrderStatus: async (id: string, status: string) => {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    },

    getAdminCustomers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
    },

    // Image Upload (Migrated to Backend Local Storage)
    uploadImage: async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            return { url: response.data.url };
        } catch (error: any) {
            console.error('Backend Upload Error:', error);
            const message = error.response?.data?.error || error.message || 'Unknown error';
            throw new Error(`Upload failed: ${message}`);
        }
    }
};

export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: string;
  createdAt: string;
}

export interface GeneratedVideo {
  id: string;
  productId: string;
  styleId: string;
  videoUrl: string;
  duration: number;
  fileSize: number;
  isFavorite: boolean;
  tags: string[];
  createdAt: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planType: 'starter' | 'pro' | 'enterprise';
  videosPerMonth: number;
  videosUsed: number;
  availableStyles: number;
  isActive: boolean;
  nextBillingDate: string;
  createdAt: string;
}

export interface VideoGenerationRequest {
  productId: string;
  imageUrl: string;
  productName: string;
  productDescription: string;
  styles: string[];
  priority: 'fast' | 'standard';
}

// NextAuth type extensions
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'user' | 'admin';
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'user' | 'admin';
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
  }
}

import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import { getUnixTime, parseISO, formatRelative, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import io from 'socket.io-client';
import api from '../services/api'
import { useAuth } from './auth'

interface Notification {
    id: string
    recipient_id: string
    title: string
    description: string
    read: boolean
    created_at: string
    formattedDate: string
}

interface NotificationContextData {
    notifications: Notification[]
    addNotification(notification: Omit<Notification, 'id' | 'read' | 'created_at' | 'formattedDate'>): Promise<void>
    setAllRead(): Promise<void>
    badge: boolean
    loading: boolean
}

const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData)

export const NotificationProvider: React.FC = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [badge, setBadge] = useState(false)
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            const response = await api.get<Notification[]>('notifications')
            const SortedNotifications = response.data.sort(
                (notificationsOne, notificationsTwo) => {
                const notificationsOneDate = getUnixTime(parseISO(notificationsOne.created_at))
                const notificationsTwoDate = getUnixTime(parseISO(notificationsTwo.created_at))
                return notificationsTwoDate - notificationsOneDate
            })

            const formattedNotifications = SortedNotifications.map(
                (notification: Notification) => ({
                ...notification,
                formattedDate: formatRelative(subHours(new Date(notification.created_at), 3), Date.now(), {
                    locale: ptBR
                }),
                })
            )
            setNotifications(formattedNotifications)
            setLoading(false)
        }

        getData()
    }, [])

    useEffect(() => {
        if(!user) {
          return
        }
        const socket = io('http://localhost:3333', {
          query: {
            user: user.id
          },
        });
    
        socket.on('notification', (notification: Notification) => {
            
            notification.formattedDate =  formatRelative(subHours(new Date(notification.created_at), 3), Date.now(), {
                locale: ptBR
            });
            
            console.log(notification);
          setNotifications(state => [notification, ...state]);
        });
      }, [user]);
      
      useEffect(() => {
          const unreadNotification = notifications.find(notification => !notification.read)
          setBadge(!!unreadNotification)
      }, [notifications])

    const addNotification = useCallback(async ({ title, description, recipient_id }: Notification) => {

        const notification = {
            title, 
            description,
            recipient_id
        }

        await api.post('notifications', notification)
    }, [])

    const setAllRead = useCallback(async () => {
        const newNotifications = notifications
        newNotifications.forEach(notification => {
            notification.read = true
        })
        setNotifications(newNotifications) 
        setBadge(false)
        await api.patch('notifications')
    }, [notifications])

    return (
        <NotificationContext.Provider value={{badge, addNotification, notifications, setAllRead, loading}}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification(): NotificationContextData {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error('useNotification must be used within an NotificationProvider')
    }

    return context
}

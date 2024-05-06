import { expect, test, describe } from '@jest/globals';
import { loginUser, logout, registerUser, updateUser } from '../actions';
import userSlice, { initialState } from './userSlice';

describe('Тест userSlice',()=>{
    const mockUser ={
        id: 1,
        name: 'Test',
        email: 'Test@test.test'
    }
    test('Тест loginUser pending',()=>{
        const action = {
            type: loginUser.pending.type
        }
        const expectState = {
            ...initialState,
            isAuthChecked: true
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест loginUser rejected',()=>{
        const action = {
            type: loginUser.rejected.type
        }
        const expectState = {
            ...initialState,
            isAuthChecked: false
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест loginUser fulfilled',()=>{
        const action = {
            type: loginUser.fulfilled.type,
            payload: mockUser
        }
        const expectState = {
            ...initialState,
            isAuthChecked: true,
            user: mockUser
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест registerUser pending',()=>{
        const action = {
            type: registerUser.pending.type,
        }
        const expectState = {
            ...initialState,
            isAuthChecked: true
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест registerUser rejected',()=>{
        const action = {
            type: registerUser.rejected.type,
        }
        const expectState = {
            ...initialState,
            isAuthChecked: false
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест registerUser fulfilled',()=>{
        const action = {
            type: registerUser.fulfilled.type,
            payload: mockUser
        }
        const expectState = {
            ...initialState,
            isAuthChecked: true,
            user: mockUser
        }
        const newState = userSlice(initialState,action);
        expect(newState).toEqual(expectState);
    }); 

    test('Тест logout fulfilled', () => {
        const action = {
            type: logout.fulfilled.type,
        };
        const expectState = {
            ...initialState,
            user: null
        };
        const newState = userSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });

    test('Тест updateUser fulfilled', () => {
        const updatedUser = {
            ...mockUser,
            email: 'testUpdate@test.te'
        };
        const action = {
            type: updateUser.fulfilled.type,
            payload: updatedUser
        };
        const expectState = {
            ...initialState,
            user: updatedUser
        };
        const newState = userSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });
})
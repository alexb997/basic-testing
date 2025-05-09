// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(80, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account1 = getBankAccount(50);
    expect(() => account1.transfer(80, account1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);
    account1.transfer(30, account2);
    expect(account2.getBalance()).toBe(130);
    expect(account1.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const acc = getBankAccount(100);

    jest.spyOn(global.Math, 'random').mockReturnValue(0.9);

    
    const balance = await acc.fetchBalance();
    expect(typeof balance).toBe('number');
    
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const acc = getBankAccount(100);
    const mockValue = 75;

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(mockValue);
    await acc.synchronizeBalance();

    expect(acc.getBalance()).toBe(mockValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const acc = getBankAccount(100);

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);

    await expect(acc.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});

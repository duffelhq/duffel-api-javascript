import { CreatePaymentIntent, PaymentIntent } from './PaymentIntentsType'

export const mockPaymentIntents: PaymentIntent = {
  updated_at: '2020-04-11T15:48:11.642Z',
  status: 'succeeded',
  refunds: [
    {
      updated_at: '2020-04-11T15:48:11.642Z',
      status: 'succeeded',
      payment_intent_id: 'pit_00009hthhsUZ8W4LxQgkjo',
      net_currency: 'GBP',
      net_amount: '300.10',
      live_mode: true,
      id: 'ref_00009hthhsUZ8W4LxQgkjo',
      destination: 'original_form_of_payment',
      currency: 'GBP',
      created_at: '2020-04-11T15:48:11.642Z',
      arrival:
        'Credit approximately 5-10 business days later, depending upon the bank.',
      amount: '300.10',
    },
  ],
  net_currency: 'GBP',
  net_amount: '297.10',
  live_mode: true,
  id: 'pit_00009hthhsUZ8W4LxQgkjo',
  fees_currency: 'GBP',
  fees_amount: '3.00',
  currency: 'GBP',
  created_at: '2020-04-11T15:48:11.642Z',
  confirmed_at: '2020-04-11T15:48:11.642Z',
  client_token:
    // eslint-disable-next-line spellcheck/spell-checker
    'eyJjbGllbnRfc2VjcmV0IjoicGlfMUl5YTBiQW5rMVRkeXJvRE1iWkJPN0ZSX3NlY3JldF9TbGFrYnJjYnFHZGZha2VrcjdCNE5jZWVyIiwicHVibGlzaGFibGVfa2V5IjoicGtfbGl2ZV81MUl0Q3YwQW5rMUdkeXJvRFlFU3M3RnBTUEdrNG9kbDhneDF3Y1RBNVEzaUcyWEFWVEhxdFlKSVhWMUxoSU5GQUtFMjA1dFdmRGVIcXhwUVdnYkIzTkVFbzAwMmdVY1hzR0YifQ==',
  card_network: 'visa',
  card_last_four_digits: '4242',
  card_country_code: 'GB',
  amount: '300.10',
}

export const mockCreatePaymentIntent: CreatePaymentIntent = {
  currency: 'GBP',
  amount: '30.20',
}

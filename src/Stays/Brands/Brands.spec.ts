import nock from 'nock'
import { Duffel } from '../../index'
import { MOCK_BRAND } from '../mocks'

const duffel = new Duffel({ token: 'mockToken' })
describe('Stays/Brands', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should get to /stays/brands when `list` is called', async () => {
    const mockResponse = { data: [MOCK_BRAND] }

    nock(/(.*)/).get('/stays/brands').reply(200, mockResponse)
    const response = await duffel.stays.brands.list()
    expect(response.data).toEqual(mockResponse.data)
  })

  it('should get to /stays/brands/{id} when `get` is called', async () => {
    const mockResponse = { data: MOCK_BRAND }

    nock(/(.*)/).get(`/stays/brands/${MOCK_BRAND.id}`).reply(200, mockResponse)
    const response = await duffel.stays.brands.get(MOCK_BRAND.id)
    expect(response.data).toEqual(mockResponse.data)
  })
})

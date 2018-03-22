import { mount } from '@vue/test-utils'
import SignIn from '@/componetns/SignIn.vue'

describe('SignIn ', () => {
 // Теперь монтируем компонент и получаем wrapper
  const wrapper = mount( SignIn );

  it('отображает корректную разметку', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // также легко проверить наличие других элементов
  it('имеет кнопку', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})

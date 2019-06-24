require 'test_helper'

class RelatorioPublicoControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get relatorio_publico_new_url
    assert_response :success
  end

  test "should get create" do
    get relatorio_publico_create_url
    assert_response :success
  end

end

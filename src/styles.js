import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  secondary: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginRight: 8,
  },
  chipTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'capitalize',
  },
  sugestoesContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
    overflow: 'hidden',
  },
  sugestaoItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sugestaoTexto: {
    fontSize: 14,
    color: '#111827',
  },
  nomeEn: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  inputErro: {
  borderColor: '#dc2626',
  borderWidth: 2,
  },
  erroTexto: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 4,
  },
});
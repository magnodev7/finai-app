import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface CategoryTotal {
  category: string;
  total: number;
}

interface MonthlyTotal {
  month: string;
  income: number;
  expenses: number;
}

interface AnalysisData {
  categoryTotals: CategoryTotal[];
  monthlyTotals: MonthlyTotal[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
  '#FF6B6B',
];

export function Analysis() {
  const { data, isLoading } = useQuery<AnalysisData>({
    queryKey: ['analysis'],
    queryFn: async () => {
      const response = await fetch('/api/analysis');
      if (!response.ok) {
        throw new Error('Failed to fetch analysis data');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">
          Receitas vs Despesas por Mês
        </h2>
        <div className="mt-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.monthlyTotals}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    notation: 'compact',
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
              <Legend />
              <Bar dataKey="income" name="Receitas" fill="#10B981" />
              <Bar dataKey="expenses" name="Despesas" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">
          Distribuição de Despesas por Categoria
        </h2>
        <div className="mt-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.categoryTotals}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  category,
                }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${category} ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
                dataKey="total"
                nameKey="category"
              >
                {data?.categoryTotals.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">
          Análise de Gastos por Categoria
        </h2>
        <div className="mt-4">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Categoria
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Porcentagem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.categoryTotals.map((category, index) => {
                      const total = data.categoryTotals.reduce(
                        (acc, curr) => acc + curr.total,
                        0
                      );
                      const percentage = (category.total / total) * 100;

                      return (
                        <tr key={category.category}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            <div className="flex items-center">
                              <div
                                className="h-3 w-3 rounded-full mr-2"
                                style={{
                                  backgroundColor: COLORS[index % COLORS.length],
                                }}
                              />
                              {category.category}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(category.total)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                            {percentage.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Send, FileText, Settings, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InternalPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  submissions: any[];
  onAddSubmission: (data: any) => void;
  onUpdateStatus: (id: number, status: string) => void;
}

export default function InternalPage({ onNavigate, onBack, submissions, onAddSubmission, onUpdateStatus }: InternalPageProps) {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    tarikh: '',
    bahagian: '',
    namaProjek: '',
    tujuanProjek: '',
    websiteUrl: '',
    kutipanData: '',
    namaPengawai: '',
    email: '',
    catatan: '',
    status: 'Pending'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['tarikh', 'bahagian', 'namaProjek', 'tujuanProjek', 'kutipanData', 'namaPengawai', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    onAddSubmission(formData);
    setFormData({
      tarikh: '',
      bahagian: '',
      namaProjek: '',
      tujuanProjek: '',
      websiteUrl: '',
      kutipanData: '',
      namaPengawai: '',
      email: '',
      catatan: '',
      status: 'Pending'
    });
    toast.success('Submission added successfully!');
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    onUpdateStatus(id, newStatus);
    toast.success('Status updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'under review':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-medium text-foreground">Internal Portal</h2>
          <p className="text-muted-foreground">Manage project requests and submissions</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeTab === 'form' ? 'default' : 'outline'}
          onClick={() => setActiveTab('form')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Submission
        </Button>
        <Button 
          variant={activeTab === 'manage' ? 'default' : 'outline'}
          onClick={() => setActiveTab('manage')}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Manage Submissions
        </Button>
      </div>

      {activeTab === 'form' && (
        <Card>
          <CardHeader>
            <CardTitle>Project Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tarikh">Tarikh *</Label>
                  <Input
                    id="tarikh"
                    type="date"
                    value={formData.tarikh}
                    onChange={(e) => handleInputChange('tarikh', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bahagian">Bahagian *</Label>
                  <Input
                    id="bahagian"
                    value={formData.bahagian}
                    onChange={(e) => handleInputChange('bahagian', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="namaProjek">Nama Projek *</Label>
                <Input
                  id="namaProjek"
                  value={formData.namaProjek}
                  onChange={(e) => handleInputChange('namaProjek', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tujuanProjek">Tujuan Projek *</Label>
                <Textarea
                  id="tujuanProjek"
                  value={formData.tujuanProjek}
                  onChange={(e) => handleInputChange('tujuanProjek', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website dan URL</Label>
                <Input
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="1. iProperty: https://www.iproperty.com.my/, 2. DurianProperty: https://www2.durianproperty.com.my/"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="kutipanData">Kutipan Data *</Label>
                  <Select value={formData.kutipanData} onValueChange={(value) => handleInputChange('kutipanData', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data collection frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-off">One-off</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="namaPengawai">Nama Pengawai *</Label>
                  <Input
                    id="namaPengawai"
                    value={formData.namaPengawai}
                    onChange={(e) => handleInputChange('namaPengawai', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="catatan">Catatan</Label>
                <Textarea
                  id="catatan"
                  value={formData.catatan}
                  onChange={(e) => handleInputChange('catatan', e.target.value)}
                  rows={3}
                  placeholder="Additional notes or comments..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'manage' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Submissions ({submissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No submissions yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Data Collection</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.tarikh}</TableCell>
                        <TableCell className="font-medium">{submission.namaProjek}</TableCell>
                        <TableCell>{submission.bahagian}</TableCell>
                        <TableCell>{submission.namaPengawai}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell className="capitalize">{submission.kutipanData}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={submission.status} 
                            onValueChange={(value) => handleStatusChange(submission.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Under Review">Under Review</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}